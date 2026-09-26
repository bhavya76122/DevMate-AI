import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white flex">
      <Sidebar />

      <main className="flex-1">
        <header className="border-b border-white/10 p-6 bg-black/20">
          <h1 className="text-4xl font-bold">AI Chat</h1>
          <p className="text-slate-300 mt-2">
            Chat with DevMate AI.
          </p>
        </header>

        <ChatInterface />
      </main>
    </div>
  );
}