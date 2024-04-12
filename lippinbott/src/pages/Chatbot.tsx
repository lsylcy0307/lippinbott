import React, { useState } from 'react';

type Resource = {
  title: string;
  description: string;
  link: string;
  recommendation: string;
  next_queries: string;
};

const ResourceCard: React.FC<Resource> = ({ title, description, link, recommendation, next_queries }) => {
  const queries = next_queries.split(/[\.,;?]/).map(query => query.trim()).filter(query => query);
  return (
    <div className="w-full max-auto bg-white rounded-xl shadow-md overflow-hidden my-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-bold">{title}</div>
        <p className="block text-lg leading-tight font-medium text-black">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="block mt-4 text-lg leading-tight font-medium text-blue-500 hover:underline text-sm">Learn More</a>
        <p className="mt-2 text-gray-500">{recommendation}</p>
        {/* Render buttons for each query */}
        <p className="mt-4 font-medium text-black text-sm"> Suggested: </p>
        <div className="mt-2">
          {queries.map((query, index) => (
            <button
              key={index}
              className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none text-sm"
              onClick={() => console.log(query)}> 
              {/* handleQueryClick */}
              {query}
          </button>
          ))}
        </div>
      </div>
    </div>
  );
};


const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [responseJson, setResponseJson] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setUserInput(input);
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
        const response = data.resp;
        console.log(response)

        setResponseJson(response);
      } else {
        setResponse('Error generating response.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error generating response.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (response) {
      setResponse('');
    }
  };

  function handleQueryClick(query: string) {
    console.log('Query clicked:', query);
    
  }

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
        <input className="flex-grow mr-2 border border-gray-300 rounded p-2 text-black" 
          value={input} 
          onChange={handleInputChange} 
          placeholder="Help me find..." />
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
        ) : responseJson && (
          <div>
            {/* <div className="border border-white-300 rounded p-4 bg-white shadow-lg w-full">
              <p className="font-normal text-gray-700"><strong>Lippinbott:</strong> {response}</p>
            </div> */}
            <h2 className="text-2xl mt-5 text-slate-300	">Your search: {userInput}</h2>
            <h2 className="text-3xl mt-5 text-white	 ">We found for you:</h2>
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