import OpenAI from "openai"; // <- ADD THIS
import connectDB from "@/lib/db";

export async function POST(req) {
  const { code } = await req.json();
  await connectDB(); // ✅ REQUIRED
  let improvedText = "";
  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an expert senior software engineer and code reviewer.

Review the given code and respond STRICTLY in the following format:

1. Code Purpose
- Explain in 1–2 lines what the code is trying to do.

2. Code Quality
- Readability: (Good / Average / Poor) — short reason
- Maintainability: (Good / Average / Poor) — short reason
- Reliability: (Good / Average / Poor) — short reason

3. Issues (if any)
- List each issue as a separate bullet point.
- If there are no issues, write: "No major issues found."

4. Best Practices & Improvements
- List suggestions as bullet points.
- Do NOT include code snippets.

Rules (VERY IMPORTANT):
- DO NOT write paragraphs.
- DO NOT explain in story form.
- DO NOT include code blocks.
- ONLY use numbered headings and bullet points.
- Be concise and professional.
- If the code is correct, clearly state that it follows good practices.

The response MUST follow the exact structure above.
 `,
      },
      {
        role: "user",
        content: code,
      },
    ],
  });
  improvedText = completion.choices[0].message.content;
  console.log("i am all user updatedddd", improvedText);
  return Response.json({ success: true, user: improvedText }, { status: 201 });
}
