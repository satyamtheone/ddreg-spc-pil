import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proxy all /api calls
  if (pathname.startsWith("/api")) {
    const url = request.nextUrl.clone();

    url.protocol = "http";
    url.hostname = "192.168.2.159";
    url.port = "5000";

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};