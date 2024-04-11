import React, { useState } from 'react';

type Resource = {
  title: string;
  description: string;
  link: string;
  recommendation: string;
};

const ResourceCard: React.FC<Resource> = ({ title, description, link, recommendation }) => (
  <div className="w-full max-auto bg-white rounded-xl shadow-md overflow-hidden my-4">
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
      <p className="block mt-1 text-lg leading-tight font-medium text-black">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="block mt-1 text-lg leading-tight font-medium text-blue-500 hover:underline">Learn More</a>
      <p className="mt-2 text-gray-500">{recommendation}</p>
    </div>
  </div>
);

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [responseJson, setResponseJson] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setInput('');

    try {
      // Make an API request to your backend endpoint with the user's input
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      // Check if the request was successful
      if (res.ok) {
        const data = await res.json();

        const firstResponse = data.resp[0];
        const secondResponse = data.resp[1];

        console.log(firstResponse);
        console.log(secondResponse);

        // const match = data.resp.match(/\[.*\]/s);
        // const strippedResponse = match ? match[0] : 'No data found';

        // setResponse(strippedResponse); 

        // const responseJson = JSON.parse(strippedResponse);
        // setResponseJson(responseJson);

        // console.log(responseJson);

      } else {
        setResponse('Error generating response.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error generating response.');
    } finally {
      setLoading(false);
    }

    // Replace this with your chatbot's response generation logic
    // setTimeout(() => {
    //   const chatbotResponse = `You said: ${input}`;
    //   setResponse(chatbotResponse);
    //   setLoading(false);
    // }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (response) {
      setResponse('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="flex mb-4">
        <input className="flex-grow mr-2 border border-gray-300 rounded p-2" value={input} onChange={handleInputChange} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded p-2" onClick={handleSend}>Send</button>
      </div>
      <div className="flex justify-center">
        {loading ? (
          <div className="border border-gray-300 rounded p-4 bg-white shadow-lg w-full flex justify-center items-center">
            <div style={{
              border: '16px solid #f3f3f3',
              borderTop: '16px solid blue',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              animation: 'spin 2s linear infinite'
            }}></div>
          </div>
        ) : response && (
          <div>
          <div className="border border-gray-300 rounded p-4 bg-white shadow-lg w-full">
            <p className="font-normal text-gray-700"><strong>Lippinbott:</strong> {response}</p>
          </div>
          <h2 className="text-3xl mt-5 text-white font-bold">Additional Resources</h2>
          <div className="flex flex-wrap justify-center items-center">
          {(responseJson! as Resource[]).map((resource: Resource, index: number) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;