import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) return errorResponse("Order not found", 404);

    return successResponse(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return errorResponse("Failed to fetch order", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { id } = await params;
    const body = await req.json();

    const updateData: Record<string, unknown> = {
      status: body.status,
      notes: body.notes,
      processedById: session.user.id,
    };

    // Set timestamps based on status
    if (body.status === "PAID" && !body.paidAt) {
      updateData.paidAt = new Date();
    }
    if (body.status === "SHIPPED" && !body.shippedAt) {
      updateData.shippedAt = new Date();
    }
    if (body.status === "DELIVERED" && !body.deliveredAt) {
      updateData.deliveredAt = new Date();
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
      include: { items: true },
    });

    return successResponse(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return errorResponse("Failed to update order", 500);
  }
}
