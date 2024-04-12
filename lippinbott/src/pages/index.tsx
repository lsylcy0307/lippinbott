import Image from "next/image";
import Chatbot from './Chatbot';



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundImage: `url('/vectorized-lippincott.svg')`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
      <h1 className="text-4xl mt-16 mb-4 text-white font-bold">Lippinbott</h1>
      <div className="w-1/2 h-3/4 min-h-3/4">
      <Chatbot />
      </div>
    </div>
  );
}