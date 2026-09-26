import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Bot, User, Loader2, Plus, Copy, History } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatHistoryItem = {
  title: string;
  messages: Message[];
};

const welcomeMessage: Message = {
  role: "assistant",
  content:
    "Hi, I am DevMate AI. Ask me anything about coding, bugs, projects, resumes, or interviews.",
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedChat = localStorage.getItem("devmate-chat");
    const savedHistory = localStorage.getItem("devmate-chat-history");

    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }

    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }

    setChatLoaded(true);
  }, []);

  useEffect(() => {
    if (chatLoaded) {
      localStorage.setItem("devmate-chat", JSON.stringify(messages));
    }
  }, [messages, chatLoaded]);

  useEffect(() => {
    if (chatLoaded) {
      localStorage.setItem(
        "devmate-chat-history",
        JSON.stringify(chatHistory)
      );
    }
  }, [chatHistory, chatLoaded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startNewChat = () => {
    if (messages.length > 1) {
      const firstUserMessage = messages.find((msg) => msg.role === "user");

      setChatHistory((prev) => [
        {
          title: firstUserMessage?.content.slice(0, 35) || "New Chat",
          messages,
        },
        ...prev,
      ]);
    }

    setMessages([welcomeMessage]);
    setInput("");
    localStorage.removeItem("devmate-chat");
  };

  const loadChatFromHistory = (chat: ChatHistoryItem) => {
    setMessages(chat.messages);
  };

  const clearChatHistory = () => {
    if (confirm("Clear all saved chat history?")) {
      setChatHistory([]);
      localStorage.removeItem("devmate-chat-history");
    }
  };

  const copyMessage = async (content: string) => {
    await navigator.clipboard.writeText(content);
    alert("Message copied!");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    const userMessage: Message = {
      role: "user",
      content: currentInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/ai/ask-ai", {
        task: "AI Chat",
        code: currentInput,
      });

      const aiMessage: Message = {
        role: "assistant",
        content: response.data.result,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error connecting to backend. Please check FastAPI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-90px)] flex">
      <aside className="w-72 border-r border-white/10 bg-black/30 p-4 hidden xl:block">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <History size={18} />
            Chat History
          </h3>

          <button
            onClick={clearChatHistory}
            className="text-xs text-red-300 hover:text-red-200"
          >
            Clear
          </button>
        </div>

        <div className="space-y-3 max-h-[calc(100vh-170px)] overflow-y-auto">
          {chatHistory.length === 0 ? (
            <p className="text-sm text-slate-400">No saved chats yet.</p>
          ) : (
            chatHistory.map((chat, index) => (
              <button
                key={index}
                onClick={() => loadChatFromHistory(chat)}
                className="w-full text-left bg-white/10 border border-white/10 rounded-xl p-3 hover:bg-white/20 transition"
              >
                <p className="text-sm font-semibold text-blue-300">
                  {chat.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {chat.messages.length} messages
                </p>
              </button>
            ))
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-end">
          <button
            onClick={startNewChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot size={22} />
                </div>
              )}

              <div
                className={`max-w-3xl rounded-2xl px-5 py-4 border ${
                  msg.role === "user"
                    ? "bg-blue-600/30 border-blue-400/30"
                    : "bg-white/10 border-white/10"
                }`}
              >
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>

                {msg.role === "assistant" && index !== 0 && (
                  <button
                    onClick={() => copyMessage(msg.content)}
                    className="mt-3 flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                  >
                    <Copy size={14} />
                    Copy response
                  </button>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <User size={22} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot size={22} />
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                DevMate AI is thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-white/10 p-5 bg-black/30">
          <div className="flex gap-3">
            <textarea
              className="flex-1 h-14 max-h-32 resize-none rounded-2xl bg-black/50 border border-white/10 p-4 outline-none text-white"
              placeholder="Ask DevMate AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold disabled:opacity-50"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}