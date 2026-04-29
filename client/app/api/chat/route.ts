import { NextRequest, NextResponse } from "next/server";

// Use the updated env variable for backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/^"(.*)"$/, '$1') || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    console.log("[FRONTEND API] 🚀 POST /api/chat request received at", new Date().toLocaleTimeString());
    console.log("[FRONTEND API] 🔗 Backend URL:", BACKEND_URL);
    
    const body = await request.json();
    console.log("[FRONTEND API] 📝 Request payload:", { 
      persona: body.persona, 
      messageLength: body.message?.length || 0,
      messagePreview: body.message?.slice(0, 100) || ""
    });
    
    const fullURL = `${BACKEND_URL}/chat`;
    console.log("[FRONTEND API] 📤 Forwarding to backend:", fullURL);
    
    const response = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("[FRONTEND API] ✅ Backend response status:", response.status);

    if (!response.ok && response.status !== 200) {
      console.error("[FRONTEND API] ❌ Backend returned status:", response.status);
      const errorText = await response.text();
      console.error("[FRONTEND API] Error response:", errorText);
    }

    if (!response.body) {
      console.error("[FRONTEND API] ❌ No response body from backend");
      return NextResponse.json(
        { error: "No response body from backend" },
        { status: 500 }
      );
    }
    
    console.log("[FRONTEND API] ✅ Backend connected, streaming response...");

    // Stream the response back to the client
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("[FRONTEND API] ❌ Error:", error?.message);
    console.error("[FRONTEND API] Stack:", error?.stack);
    return NextResponse.json(
      { error: error?.message || "Failed to connect to backend" },
      { status: 500 }
    );
  }
}
