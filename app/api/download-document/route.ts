import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return new Response("Failed to fetch document", { status: 500 });
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") || "application/pdf";

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch {
    return new Response("Server error", { status: 500 });
  }
}
