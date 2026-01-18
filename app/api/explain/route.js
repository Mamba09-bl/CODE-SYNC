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
        content: `
- What the code is doing
- What is wrong (if anything)
- Why it happens
- How to fix it
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
