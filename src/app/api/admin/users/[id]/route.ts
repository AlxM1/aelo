import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import bcrypt from "bcryptjs";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    // Only super admins can modify users
    if (session.user.role !== "SUPER_ADMIN") {
      return errorResponse("Insufficient permissions", 403);
    }

    const { id } = await params;
    const body = await req.json();

    const updateData: Record<string, unknown> = {
      email: body.email,
      name: body.name,
      role: body.role,
      isActive: body.isActive,
    };

    // If password is provided, hash it
    if (body.password) {
      updateData.passwordHash = await bcrypt.hash(body.password, 12);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    return successResponse(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return errorResponse("Failed to update user", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return errorResponse("Unauthorized", 401);

    // Only super admins can delete users
    if (session.user.role !== "SUPER_ADMIN") {
      return errorResponse("Insufficient permissions", 403);
    }

    const { id } = await params;

    // Prevent self-deletion
    if (id === session.user.id) {
      return errorResponse("Cannot delete your own account", 400);
    }

    await prisma.user.delete({
      where: { id },
    });

    return successResponse({ deleted: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return errorResponse("Failed to delete user", 500);
  }
}
