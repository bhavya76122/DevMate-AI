import { Bot } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white">
      <Bot size={70} className="animate-bounce text-purple-500" />
      <h1 className="mt-5 text-3xl font-bold">DevMate AI</h1>
      <p className="text-gray-400 mt-2">
        Initializing AI Assistant...
      </p>
    </div>
  );
}