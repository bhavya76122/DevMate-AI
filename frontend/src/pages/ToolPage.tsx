import { useState } from "react";
import AIChat from "../components/AIChat";

type ToolPageProps = {
  title: string;
  description: string;
  defaultTask: string;
};

export default function ToolPage({
  title,
  description,
  defaultTask,
}: ToolPageProps) {
  const [selectedTask, setSelectedTask] = useState(defaultTask);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white">
      <header className="border-b border-white/10 p-6 bg-black/20">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-slate-300 mt-2">{description}</p>
      </header>

      <AIChat selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
    </div>
  );
}