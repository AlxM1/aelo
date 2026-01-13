import { auth } from "./auth";
import { Role } from "@prisma/client";

type Permission =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "manage_users"
  | "manage_settings";

const rolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: ["read", "create", "update", "delete", "manage_users", "manage_settings"],
  ADMIN: ["read", "create", "update", "delete", "manage_settings"],
  EDITOR: ["read", "create", "update"],
};

export async function checkPermission(permission: Permission): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.role) return false;

  const role = session.user.role as Role;
  return rolePermissions[role]?.includes(permission) ?? false;
}

export async function requirePermission(permission: Permission) {
  const hasPermission = await checkPermission(permission);
  if (!hasPermission) {
    throw new Error("Unauthorized: Insufficient permissions");
  }
}

export function hasRole(userRole: string, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole as Role);
}
