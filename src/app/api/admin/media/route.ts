import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse, paginatedResponse } from "@/lib/api-response";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.media.count(),
    ]);

    return paginatedResponse(media, total, page, limit);
  } catch (error) {
    console.error("Error fetching media:", error);
    return errorResponse("Failed to fetch media", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return errorResponse("No file provided", 400);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filepath = path.join(uploadDir, filename);

    // Ensure uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    await writeFile(filepath, buffer);

    const media = await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: `/uploads/${filename}`,
      },
    });

    return successResponse(media, 201);
  } catch (error) {
    console.error("Error uploading file:", error);
    return errorResponse("Failed to upload file", 500);
  }
}
