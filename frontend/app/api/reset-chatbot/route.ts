import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const flaskRes = await fetch("http://127.0.0.1:5000/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await flaskRes.json();
    return NextResponse.json(data, { status: flaskRes.status });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to reset chatbot", detail: e.message }, { status: 500 });
  }
}
