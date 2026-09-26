import { Code2, Bug, FileText, Database } from "lucide-react";

const features = [
  {
    title: "Code Generation",
    desc: "Generate clean code using AI.",
    icon: Code2,
  },
  {
    title: "Bug Detection",
    desc: "Find errors and improve code quality.",
    icon: Bug,
  },
  {
    title: "SQL Generator",
    desc: "Create SQL queries from plain English.",
    icon: Database,
  },
  {
    title: "Documentation",
    desc: "Generate README and code docs.",
    icon: FileText,
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition"
          >
            <Icon className="text-blue-400 mb-3" size={28} />
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{feature.desc}</p>
          </div>
        );
      })}
    </div>
  );
}