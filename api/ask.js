import OpenAI from "openai";

function clampAnswer(answer) {
  const normalized = String(answer || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]{2,}/g, " ").trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (normalized.length <= 520) return normalized;

  const truncated = normalized.slice(0, 520);
  const cutoff = Math.max(
    truncated.lastIndexOf("\n\n"),
    truncated.lastIndexOf(". "),
    truncated.lastIndexOf("? "),
    truncated.lastIndexOf("! "),
    truncated.lastIndexOf("\n")
  );

  if (cutoff > 220) {
    return truncated.slice(0, cutoff + 1).trim();
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
keep answers short unless user explicitly asks for detail.
prefer clean line breaks for readability (2-5 short lines is ideal).
if listing actions, use plain text with leading "- ".
no emojis, no roleplay disclaimers, no code fences.
if asked for available commands, output exactly:
available commands:
- about
- experience
- projects
- skills
- goals
- funfact
- contact
- /help
- /theme
- /clear`,
      },
      ...messages,
    ];

    const resp = await client.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: conversationMessages,
      max_tokens: 220,
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
