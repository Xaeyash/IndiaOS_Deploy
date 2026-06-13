export async function POST(request) {
  const { prompt } = await request.json();

  // If no API key set, return demo message
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({
      text: "🔧 Demo mode — add ANTHROPIC_API_KEY in Vercel settings to activate AI features.",
    });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    return Response.json({ text: data.content?.[0]?.text || "No response." });
  } catch (err) {
    return Response.json({ text: "AI analysis unavailable right now." });
  }
}
