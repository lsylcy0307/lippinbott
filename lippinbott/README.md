# Lippincott Library Assistant Search Engine
This project is the first AI powered search engine for the Wharton Lippincott Library. It was created for the Wharton AI Hackathon to help users efficiently find academic resources and research guidance using the OpenAI API.

### Purpose
The Lippincott Library Assistant Search Engine is designed to assist users in finding relevant resources related to their academic research topics and to guide them on the next steps for their research. Leveraging OpenAI's API and additional web scraping, the assistant provides accurate, relevant, and detailed information based on the user's queries.

### Features
Search and Recommendations: Users can enter a research query, and the assistant will provide relevant resources based on the query. Each resource includes a title, description, and link for further reading.

Guidance and Suggestions: In addition to listing resources, the assistant offers recommendations for the user's research journey and suggests potential follow-up questions for further queries.

User-Friendly Interface: The search engine provides an intuitive and user-friendly interface where users can input their queries and receive a curated list of resources.

OpenAI Integration: The project integrates OpenAI's Chat API (gpt-4-turbo) to generate responses based on the user's query, offering a high-quality research experience.

### Code Overview
Backend: The backend consists of an API route (/api/openai) that handles incoming requests with the user's query. The route communicates with OpenAI's API to generate responses and parse the JSON data for frontend usage.

Frontend: The frontend is a React component (Chatbot.tsx) that provides the user interface for the search engine. It allows users to input queries, display the AI-generated responses, and interact with the recommended resources.

Data Resources: The backend API uses a list of data resources (data/resources.ts) as a source for relevant search results.

### Start by asking
Examples:
- "I want to learn about entrepreneurship"
- "Business in India"
- "Give me resources related to consulting"





This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
