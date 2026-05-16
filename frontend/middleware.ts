// middleware.ts (root এ) — Route Protection
// কেন? /admin/dashboard এ login ছাড়া যেতে না পারে।

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ac_admin_token")?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin/dashboard");
  const isLoginPage = pathname === "/admin/login";

  // Dashboard এ token ছাড়া গেলে login এ redirect
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Login page এ token থাকলে dashboard এ redirect
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
