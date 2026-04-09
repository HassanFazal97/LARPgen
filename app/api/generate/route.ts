import Anthropic from "@anthropic-ai/sdk";
import { ratelimit } from "@/lib/ratelimit";
import {
  buildPrompt,
  MAX_TOKENS,
  type Persona,
  type Platform,
  type Tone,
} from "@/lib/prompts";

const VALID_PERSONAS: Persona[] = ["founder", "vc", "grinder", "ai"];
const VALID_PLATFORMS: Platform[] = ["linkedin", "x", "reel", "thread"];
const VALID_TONES: Tone[] = [
  "inspirational",
  "humble-brag",
  "contrarian",
  "raw-vulnerable",
  "vague-profound",
];

export async function POST(request: Request) {
  try {
    // Rate limiting
    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return Response.json(
          { error: "Even LARPing has limits. Try again in a minute." },
          { status: 429 }
        );
      }
    }

    const body = await request.json();
    const { persona, platform, tone, content } = body;

    // Validate required fields
    if (!persona || !platform || !tone || !content) {
      return Response.json(
        { error: "Missing required fields: persona, platform, tone, content" },
        { status: 400 }
      );
    }

    if (!VALID_PERSONAS.includes(persona)) {
      return Response.json({ error: "Invalid persona" }, { status: 400 });
    }
    if (!VALID_PLATFORMS.includes(platform)) {
      return Response.json({ error: "Invalid platform" }, { status: 400 });
    }
    if (!VALID_TONES.includes(tone)) {
      return Response.json({ error: "Invalid tone" }, { status: 400 });
    }

    const { system, userMessage } = buildPrompt({
      persona,
      platform,
      tone,
      content: typeof content === "string" ? content.slice(0, 2000) : "",
    });

    const client = new Anthropic();

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: MAX_TOKENS[platform as Platform],
      system,
      messages: [{ role: "user", content: userMessage }],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return Response.json(
      { error: "Something broke. Even the LARP couldn't save us." },
      { status: 500 }
    );
  }
}
