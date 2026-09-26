import {
  Code2,
  Bug,
  FileText,
  Database,
  Briefcase,
  MessageSquare,
  Settings,
  Info,
  User,
} from "lucide-react";

import logo from "../assets/logo.png";

const menuItems = [
  { name: "AI Chat", path: "/chat", icon: MessageSquare },
  { name: "Code Generator", path: "/code-generator", icon: Code2 },
  { name: "Bug Detector", path: "/bug-detector", icon: Bug },
  { name: "SQL Generator", path: "/sql-generator", icon: Database },
  { name: "Resume Analyzer", path: "/resume-analyzer", icon: Briefcase },
  { name: "Documentation", path: "/documentation", icon: FileText },
  { name: "Interview Questions", path: "/interview", icon: MessageSquare },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "About", path: "/about", icon: Info },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-black/40 border-r border-white/10 p-5 hidden lg:block">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <img
          src={logo}
          alt="DevMate AI"
          className="w-12 h-12 rounded-xl"
        />

        <div>
          <h1 className="font-bold text-xl">DevMate AI</h1>
          <p className="text-xs text-gray-400">
            Developer Copilot
          </p>
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = window.location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => {
                window.location.href = item.path;
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${
                active
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-5 text-xs text-slate-500">
        DevMate AI v1.0
      </div>
    </aside>
  );
}