import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const flaskUrl = "http://127.0.0.1:5000/chat";
  try {
    const flaskRes = await fetch(flaskUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const flaskData = await flaskRes.json();
    return NextResponse.json(flaskData);
  } catch (error) {
    return NextResponse.json({ error: "Error conectando con Flask" }, { status: 500 });
  }
}
