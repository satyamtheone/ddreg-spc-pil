import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  /* ================= API PROXY ================= */
  if (pathname.startsWith("/api")) {
    const baseUrl =  process.env.NEXT_PUBLIC_PROD_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_PROD_URL is not defined");
    }

    const url = new URL(pathname + search, baseUrl);

    return NextResponse.rewrite(url);
  }

  /* ================= ROUTE PROTECTION ================= */

  const isAuthRoute = pathname === "/";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Not logged in -> redirect to login
  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Already logged in -> prevent going to login
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/"],
};
