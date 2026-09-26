import { useEffect, useState } from "react";
import axios from "axios";
import { Bot, FileUp, MessageSquare, User } from "lucide-react";

type StatsCardsProps = {
  userName: string;
  userEmail: string;
};

export default function StatsCards({ userName, userEmail }: StatsCardsProps) {
  const [aiRequests, setAiRequests] = useState(0);
  const [filesUploaded, setFilesUploaded] = useState(0);
  const [conversations, setConversations] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/history/stats/${userEmail}`
        );

        setAiRequests(response.data.ai_requests);
        setFilesUploaded(response.data.files_uploaded);
        setConversations(response.data.conversations);
      } catch (error) {
        console.log("Failed to load stats", error);
      }
    };

    loadStats();
  }, [userEmail]);

  const stats = [
    {
      title: "AI Requests",
      value: aiRequests,
      icon: Bot,
    },
    {
      title: "Files Uploaded",
      value: filesUploaded,
      icon: FileUp,
    },
    {
      title: "Conversations",
      value: conversations,
      icon: MessageSquare,
    },
    {
      title: "Logged User",
      value: userName || "Developer",
      icon: User,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 pt-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}