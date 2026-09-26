import { Link } from "react-router-dom";
import { Bot, Code2, Bug, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white">
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Bot className="text-blue-400" size={32} />
          <h1 className="text-2xl font-bold">DevMate AI</h1>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 font-semibold hover:bg-white/20 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="text-center px-6 py-24">
        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Your AI Software <br /> Engineer Assistant
        </h2>

        <p className="text-slate-300 max-w-2xl mx-auto mt-6 text-lg">
          Generate code, detect bugs, explain programs, create SQL queries,
          analyze resumes, and prepare for interviews using AI.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-lg hover:scale-105 transition"
        >
          Start Using DevMate AI
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 pb-20">
        {[
          { title: "Code Generator", icon: Code2 },
          { title: "Bug Detector", icon: Bug },
          { title: "Resume Analyzer", icon: FileText },
          { title: "AI Chat", icon: Bot },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition"
            >
              <Icon className="mx-auto text-blue-400 mb-4" size={36} />
              <h3 className="font-bold text-xl">{item.title}</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
}