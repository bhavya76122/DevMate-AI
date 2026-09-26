import { Link } from "react-router-dom";
import { Bot, Code2, Database,} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <Link to="/dashboard" className="text-blue-400">
          ← Back to Dashboard
        </Link>

        <div className="mt-10 bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
              <Bot size={36} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">About DevMate AI</h1>
              <p className="text-slate-400 mt-2">
                AI Software Engineer Assistant for developers and students.
              </p>
            </div>
          </div>

          <p className="text-slate-300 mt-8 leading-relaxed">
            DevMate AI is a full-stack AI-powered developer assistant that helps
            users generate code, explain programs, detect bugs, convert Java to
            Python, generate SQL queries, create documentation, analyze resumes,
            and prepare for interviews.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
              <Code2 className="text-blue-400 mb-3" />
              <h3 className="font-bold text-xl">Frontend</h3>
              <p className="text-slate-400 mt-2">
                React, TypeScript, Tailwind CSS
              </p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
              <Bot className="text-blue-400 mb-3" />
              <h3 className="font-bold text-xl">AI</h3>
              <p className="text-slate-400 mt-2">
                Ollama Local LLM with llama3.2
              </p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
              <Database className="text-blue-400 mb-3" />
              <h3 className="font-bold text-xl">Backend</h3>
              <p className="text-slate-400 mt-2">
                FastAPI, SQLite, JWT Authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}