import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rateLimit";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

// System prompt — gives the AI full context about Imadh's portfolio
const SYSTEM_PROMPT = `You are an AI assistant embedded in the portfolio of Imadh Hussain, a Full-Stack Software Engineer. Your role is to help visitors learn more about Imadh's skills, projects, and experience.

Key facts about Imadh:
- Full-Stack Developer and Software Engineering student (3rd Year) at University of Staffordshire via APIIT Sri Lanka
- Vice President of APIIT FullStack Computer Society (FCS)
- Stack: React, Next.js, Flutter, Laravel, PHP, C# .NET, Firebase, MySQL, AWS
- Projects:
  • Nest Track — Cross-platform reverse logistics system (Flutter mobile + Next.js web dashboard, Firebase)
  • Campus Reserve (Mobile) — Flutter offline-capable room booking app
  • Campus Reserve (Web) — Laravel 12 SaaS room booking platform with Livewire + Sanctum
  • Aegis — Offline-first PWA emergency rapid response system (PHP, MySQL, JS)
  • Inventory Management System — 3-tier C# .NET desktop app with MySQL
- Email: immylance@gmail.com
- LinkedIn: https://linkedin.com/in/imadh-hussain
- GitHub: https://github.com/TitanOfTime
- Portfolio: https://imadh.com

Be concise, friendly, and professional. If asked about topics unrelated to Imadh's portfolio or work, politely redirect the conversation. Do not make up information not listed above.`;

export async function POST(req: NextRequest) {
  try {
    // 0. Rate limiting (max 5 requests per minute per IP)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { limited, resetMs } = isRateLimited(ip, {
      limit: 5,
      windowMs: 60 * 1000,
    });

    if (limited) {
      const retryAfter = Math.ceil(resetMs / 1000);
      return NextResponse.json(
        { error: `Too many requests. Please slow down and try again in ${retryAfter}s.` },
        { 
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString()
          }
        }
      );
    }

    // Set standard Google provider environment variable using the GEMINI_API_KEY
    if (process.env.GEMINI_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY;
    }

    // 1. Validate API key presence (fail fast on misconfiguration)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    // 2. Parse and validate incoming request body
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    // 3. Sanitize messages — only allow known roles and string content
    const allowedRoles = ["user", "assistant"];
    const sanitizedMessages = messages
      .filter(
        (m: { role: string; content: string }) =>
          allowedRoles.includes(m.role) &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-20) // keep last 20 messages max to prevent token abuse
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content.trim().slice(0, 2000), // max 2000 chars per message
      }));

    // 4. Generate response using Google Gemini provider and Vercel AI SDK
    const { text } = await generateText({
      model: google("gemini-3.1-flash-lite"),
      system: SYSTEM_PROMPT,
      messages: sanitizedMessages,
    });

    // 5. Return only the assistant reply — matching existing JSON contract
    return NextResponse.json({ reply: text }, { status: 200 });
  } catch (err) {
    console.error("[Chat route error]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
