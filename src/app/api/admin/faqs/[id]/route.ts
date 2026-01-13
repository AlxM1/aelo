import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { id } = await params;
    const body = await req.json();

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category,
        sortOrder: body.sortOrder,
        isPublished: body.isPublished,
      },
    });

    return successResponse(faq);
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return errorResponse("Failed to update FAQ", 500);
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
    await prisma.fAQ.delete({
      where: { id },
    });

    return successResponse({ deleted: true });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return errorResponse("Failed to delete FAQ", 500);
  }
}
