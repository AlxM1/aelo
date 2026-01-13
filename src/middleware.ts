import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const isApiAdminRoute = req.nextUrl.pathname.startsWith("/api/admin");

  // Allow login page without auth
  if (isLoginPage) {
    if (req.auth) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if ((isAdminRoute || isApiAdminRoute) && !req.auth) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
