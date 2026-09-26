import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", {
        full_name: fullName,
        email,
        password,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
            <Bot size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-slate-400 text-center mt-2">
          Start building with DevMate AI
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none"
          />

          <button
            onClick={handleRegister}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold"
          >
            Register
          </button>
        </div>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}