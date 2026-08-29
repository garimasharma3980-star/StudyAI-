export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, subject, level } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        instructions:
          "You are StudyAI, a friendly personal AI tutor. " +
          "Teach step by step, clearly and simply. " +
          "Ask a short follow-up question when useful. " +
          `The student's subject is ${subject || "general study"} and level is ${level || "school level"}.`,
        input: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "AI request failed"
      });
    }

    return res.status(200).json({
      answer: data.output_text || "I couldn't generate an answer."
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error"
    });
  }
}
