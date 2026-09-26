import { Link } from "react-router-dom";
import { Settings as SettingsIcon, Trash2 } from "lucide-react";

export default function Settings() {
  const clearLocalData = () => {
    if (confirm("Clear all local app data?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
            <SettingsIcon size={34} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">Settings</h1>
        <p className="text-slate-400 text-center mt-2">
          Manage your DevMate AI preferences
        </p>

        <div className="mt-8 space-y-4">
          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <p className="text-sm text-slate-400">AI Provider</p>
            <p className="font-semibold">Ollama Local LLM</p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <p className="text-sm text-slate-400">Model</p>
            <p className="font-semibold">llama3.2</p>
          </div>

          <button
            onClick={clearLocalData}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 border border-red-400/30 hover:bg-red-500/30"
          >
            <Trash2 size={18} />
            Clear Local Data
          </button>
        </div>

        <Link
          to="/dashboard"
          className="block text-center mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}