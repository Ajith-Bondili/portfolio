import OpenAI from "openai";

function clampAnswer(answer) {
  const cleaned = (answer || "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= 420) return cleaned;

  const truncated = cleaned.slice(0, 420);
  const punctuationIndex = Math.max(
    truncated.lastIndexOf("."),
    truncated.lastIndexOf("?"),
    truncated.lastIndexOf("!")
  );

  if (punctuationIndex > 120) {
    return truncated.slice(0, punctuationIndex + 1).trim();
  }

  return `${truncated.trim()}...`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Only POST allowed");
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided" });
  }

  const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  try {
    const conversationMessages = [
      {
        role: "system",
        content: `you are ajith bondili chatting inside a terminal portfolio.
respond as ajith in lowercase, concise, friendly language.
keep answers short: 1-3 sentences unless user explicitly asks for detail.
no markdown, no emojis, no roleplay disclaimers.
if asked for available commands, output exactly:
available commands:
- about
- experience
- projects
- skills
- goals
- funfact
- contact
- /goto <window>
- /theme
- /clear`,
      },
      ...messages,
    ];

    const resp = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: conversationMessages,
      max_tokens: 160,
      temperature: 0.7,
    });

    const answer = clampAnswer(resp.choices?.[0]?.message?.content || "");
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Gemini error:", err);
    return res
      .status(500)
      .json({ error: "LLM request failed", details: err.toString() });
  }
}
