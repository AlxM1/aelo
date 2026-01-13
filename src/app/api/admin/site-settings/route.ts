import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    let settings = await prisma.siteSettings.findFirst({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "default" },
      });
    }

    return successResponse(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return errorResponse("Failed to fetch settings", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    const body = await req.json();

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: body,
      create: { id: "default", ...body },
    });

    return successResponse(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return errorResponse("Failed to update settings", 500);
  }
}
