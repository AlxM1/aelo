import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    // Only super admins and admins can view users
    if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
      return errorResponse("Insufficient permissions", 403);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse("Failed to fetch users", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    // Only super admins can create users
    if (session.user.role !== "SUPER_ADMIN") {
      return errorResponse("Insufficient permissions", 403);
    }

    const body = await req.json();

    // Validate required fields
    if (!body.email || !body.password || !body.name) {
      return errorResponse("Email, password, and name are required", 400);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return errorResponse("User with this email already exists", 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, 12);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        passwordHash,
        role: body.role || "EDITOR",
        isActive: body.isActive ?? true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return successResponse(user, 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return errorResponse("Failed to create user", 500);
  }
}
