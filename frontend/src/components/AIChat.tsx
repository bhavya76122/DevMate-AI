import { useState, useEffect } from "react";
import axios from "axios";
import { Copy, Trash2, Loader2, Upload, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type AIChatProps = {
  selectedTask: string;
  setSelectedTask: (task: string) => void;
};

type HistoryItem = {
  task: string;
  input: string;
  output: string;
};

export default function AIChat({ selectedTask, setSelectedTask }: AIChatProps) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const user = JSON.parse(localStorage.getItem("devmate-user") || "{}");

  useEffect(() => {
    const loadHistory = async () => {
      if (!user.email) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/history/${user.email}`
        );

        const formattedHistory = response.data.map((item: any) => ({
          task: item.task,
          input: item.input_text,
          output: item.output_text,
        }));

        setHistory(formattedHistory);
      } catch (error) {
        console.log("Failed to load history", error);
      }
    };

    loadHistory();
  }, []);

  const handleAskAI = async () => {
    if (!code.trim()) {
      alert("Please enter code or question");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const response = await axios.post("http://127.0.0.1:8000/api/ai/ask-ai", {
        task: selectedTask,
        code,
      });

      const aiOutput = response.data.result;
      setResult(aiOutput);

      const newHistory = {
        task: selectedTask,
        input: code,
        output: aiOutput,
      };

      setHistory((prev) => [newHistory, ...prev]);

      if (user.email) {
        await axios.post("http://127.0.0.1:8000/api/history/save", {
          user_email: user.email,
          task: selectedTask,
          input_text: code,
          output_text: aiOutput,
        });
      }
    } catch (error) {
      setResult("Error connecting to backend. Please check FastAPI server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert("AI output copied!");
  };

  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTask.replaceAll(" ", "_")}_output.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setCode("");
    setResult("");
  };

  const clearHistory = async () => {
  if (!confirm("Are you sure you want to clear all conversations?")) return;

  try {
    if (user.email) {
      await axios.delete(`http://127.0.0.1:8000/api/history/${user.email}`);
    }

    setHistory([]);
    setResult("");
  } catch (error) {
    alert("Failed to clear history from database.");
  }
};

  const loadHistoryItem = (item: HistoryItem) => {
    setSelectedTask(item.task);
    setCode(item.input);
    setResult(item.output);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_email", user.email || "guest");

      try {
        setLoading(true);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/upload/pdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setCode(response.data.text);
      } catch (error) {
        alert("PDF upload failed. Please try another PDF.");
      } finally {
        setLoading(false);
      }
    } else {
      const reader = new FileReader();

      reader.onload = () => {
        const text = reader.result as string;
        setCode(text);
      };

      reader.readAsText(file);
    }

    event.target.value = "";
  };

  const placeholderText =
    selectedTask === "Generate Code"
      ? "Example: Create a Java program for student management system..."
      : selectedTask === "Find Bugs"
      ? "Paste your code here to find bugs..."
      : selectedTask === "Generate SQL Query"
      ? "Example: Create SQL query to find top 5 customers by total orders..."
      : selectedTask === "Resume Analyzer"
      ? "Paste your resume text here or upload resume PDF..."
      : selectedTask === "Generate Documentation"
      ? "Paste your project code or details here..."
      : "Paste your code or ask your question here...";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{selectedTask}</h2>

        <label className="text-sm text-slate-300">Select Task</label>
        <select
          className="w-full mt-2 mb-4 p-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
        >
          <option>Generate Code</option>
          <option>Explain Code</option>
          <option>Find Bugs</option>
          <option>Convert Java to Python</option>
          <option>Generate Unit Tests</option>
          <option>Generate SQL Query</option>
          <option>Generate Documentation</option>
          <option>Resume Analyzer</option>
          <option>Interview Question Generator</option>
        </select>

        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-300">Input</label>

          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 cursor-pointer text-sm">
            <Upload size={16} />
            Upload File
            <input
              type="file"
              className="hidden"
              accept=".java,.py,.js,.ts,.tsx,.txt,.md,.csv,.pdf"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        <textarea
          className="w-full mt-2 h-80 p-4 rounded-xl bg-black border border-slate-700 text-green-300 font-mono"
          placeholder={placeholderText}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          <button
            onClick={handleClear}
            className="px-5 py-3 rounded-xl font-bold bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 transition"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="bg-black/50 border border-white/20 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">AI Output</h2>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!result}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 disabled:opacity-40"
            >
              <Copy size={18} />
              Copy
            </button>

            <button
              onClick={handleDownload}
              disabled={!result}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 disabled:opacity-40"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-200">
          {loading ? (
            <p>DevMate AI is thinking... Please wait.</p>
          ) : result ? (
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  return match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-slate-800 px-2 py-1 rounded text-blue-300"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {result}
            </ReactMarkdown>
          ) : (
            <p>AI response will appear here...</p>
          )}
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">Conversation History</h3>

            <button
              onClick={clearHistory}
              className="text-sm bg-red-500/20 px-3 py-1 rounded-lg hover:bg-red-500/40"
            >
              Clear
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-sm text-slate-400">No history yet.</p>
            ) : (
              history.map((item, index) => (
                <button
                  key={index}
                  onClick={() => loadHistoryItem(item)}
                  className="w-full text-left bg-white/10 border border-white/10 rounded-xl p-3 hover:bg-white/20 transition"
                >
                  <p className="text-sm text-blue-300 font-semibold">
                    {item.task}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {item.input}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}