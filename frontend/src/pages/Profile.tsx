import { Link } from "react-router-dom";
import { Bot, Mail, User } from "lucide-react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("devmate-user") || "{}");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
            <Bot size={34} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">User Profile</h1>
        <p className="text-slate-400 text-center mt-2">
          Your DevMate AI account details
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-4">
            <User className="text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Full Name</p>
              <p className="font-semibold">{user.full_name || "Developer"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-4">
            <Mail className="text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="font-semibold">{user.email || "Not available"}</p>
            </div>
          </div>
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