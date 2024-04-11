import Image from "next/image";
import Chatbot from './Chatbot';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Lippinbott</h1>
      <div className="w-1/2 h-3/4">
      <Chatbot />
      </div>
    </div>
  );
}