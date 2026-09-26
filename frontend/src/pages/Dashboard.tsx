import Sidebar from "../components/Sidebar";
import FeatureCards from "../components/FeatureCards";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import StatsCards from "../components/StatsCards";

export default function Dashboard() {
  const { darkMode, toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem("devmate-user") || "{}");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white flex">
      <Sidebar />

      <main className="flex-1">
        <header className="border-b border-white/10 p-6 bg-black/20 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              AI Software Engineer Assistant
            </h1>
            <p className="text-slate-300 mt-2">
              Welcome, {user.full_name || "Developer"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => {
                window.location.href = "/profile";
              }}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20"
            >
              Profile
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("devmate-token");
                localStorage.removeItem("devmate-user");
                window.location.href = "/login";
              }}
              className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-400/30 hover:bg-red-500/30"
            >
              Logout
            </button>
          </div>
        </header>

        <StatsCards
          userName={user.full_name || "Developer"}
          userEmail={user.email || ""}
        />

        <FeatureCards />

        <div className="p-6">
          <div className="bg-white/10 rounded-2xl border border-white/10 p-8 text-center">
            <h2 className="text-3xl font-bold">Welcome to DevMate AI</h2>

            <p className="text-slate-400 mt-3">
              Select any feature from the left sidebar to start using AI tools.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}