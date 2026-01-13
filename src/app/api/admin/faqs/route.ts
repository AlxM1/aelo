import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const faqs = await prisma.fAQ.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });

    return successResponse(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return errorResponse("Failed to fetch FAQs", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();

    const faq = await prisma.fAQ.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category,
        sortOrder: body.sortOrder || 0,
        isPublished: body.isPublished ?? true,
      },
    });

    return successResponse(faq, 201);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return errorResponse("Failed to create FAQ", 500);
  }
}
