import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse, paginatedResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
            { slug: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { sortOrder: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return paginatedResponse(products, total, page, limit);
  } catch (error) {
    console.error("Error fetching products:", error);
    return errorResponse("Failed to fetch products", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();

    // Generate slug from name if not provided
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const product = await prisma.product.create({
      data: {
        ...body,
        slug,
        price: parseFloat(body.price),
        compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null,
        createdById: session.user.id,
        updatedById: session.user.id,
      },
    });

    return successResponse(product, 201);
  } catch (error) {
    console.error("Error creating product:", error);
    return errorResponse("Failed to create product", 500);
  }
}
