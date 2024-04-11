// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

type Data = {
  name: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  console.log(prompt);
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{"role": "user", "content": "Help me find resources related to entrepreneurship"}],
    });
    
    const resp = chatCompletion.choices[0].message;

    return res.status(200).json({ resp });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
