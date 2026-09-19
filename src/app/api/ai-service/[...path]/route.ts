import { NextResponse } from "next/server";

const serviceUrl = process.env.FASTAPI_URL ?? "http://127.0.0.1:8000";

export async function POST(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  try {
    const body = await request.text();
    const response = await fetch(`${serviceUrl}/${params.path.join("/")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });

    const payload = await response.text();
    return new NextResponse(payload, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json(
      { detail: "The FinSakhi AI service is unavailable. Start FastAPI and try again." },
      { status: 503 },
    );
  }
}