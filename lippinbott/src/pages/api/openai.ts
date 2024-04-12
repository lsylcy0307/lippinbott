// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { resource } from '../data/resources';
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
  const prompt = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  // k-nearest?

  try {
    const roleDefiner = "You are an AI assistant named Lippinbott, trained on a comprehensive database of text information from the Lippincott Library. Your primary function is to assist users by providing accurate, relevant, and detailed information based on their queries. You must interpret the user’s questions, search through the Lippincott database, and present the findings in a clear, concise, and informative manner. Your responses should be educational and tailored to the user’s level of understanding, ensuring they receive the most useful and contextually appropriate information. Whenever a user inputs a query, analyze the content, extract the key elements, and generate a response that addresses the query with precision and depth, using the knowledge you’ve acquired from the Lippincott Library. Respond in a helpful, engaging, and professional tone.";
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        
        {"role": "assistant", "content": `
      
      Your goal is to assist users in finding resources related to their academic research topics, as well as guide them on the next steps for their research. You have access to a database of text data (~10 entries) scraped from the online library, which is attached at the end of this prompt.

      My query is: ${prompt.prompt}.

      1. Determine the research topic or specific question I am asking about in my query.

      2. Search the database of ~10 text data entries attached at the end of the prompt and identify the most relevant resources for my query. 

      3. For each relevant resource, you will return information in JSON format:

         {
           "title": "{resource title}",
           "description": "{resource description}",
           "link": "{website link}",
           "recommendation": "{next step recommendation}",
           "next_queries" : "{next queries}",
         }

         "description" includes a brief summary or description of each resource, giving me an overview of what the resource offers.

         "link" is the website link to where you found the resource so I can access it directly.

         "recommendation" includes ideas next steps for my research journey based on my query and the resources you've shared.

         for "next_queries", generate some potential follow-up questions for me to copy and paste for future queries.

      4. Provide a minimum of three but ideally five different relevant resources for my query. Feel free to include more resources if they are pertinent to the topic.

      Stay concise and focused in your response. Aim to provide actionable guidance.
      At the end, ONLY provide the JSON format response. Do not include additional commentary or descriptions outside of the JSON object.

      ----------
      
      Resources: ${resource}`}], 

    });
    
    const resp = chatCompletion.choices[0].message.content || ""; //get the content from the api response

    const cleanResp = resp.replace(/```json|```/g, ''); // Remove any backticks and code block syntax

    try {
        // Parse the cleaned response
        const jsonData = JSON.parse(cleanResp);

        // Return the JSON data
        return res.status(200).json({ resp: jsonData });
    } catch (error) {
        return res.status(500).json({ error: "Error parsing JSON" });
    }
    
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
