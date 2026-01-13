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
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) return errorResponse("Product not found", 404);

    return successResponse(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return errorResponse("Failed to fetch product", 500);
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

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...body,
        price: body.price ? parseFloat(body.price) : undefined,
        compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null,
        updatedById: session.user.id,
      },
    });

    return successResponse(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return errorResponse("Failed to update product", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    return successResponse({ deleted: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return errorResponse("Failed to delete product", 500);
  }
}
