import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import AIChatPage from "./pages/AIChatPage";
import ToolPage from "./pages/ToolPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/chat"
  element={
    <ProtectedRoute>
      <AIChatPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/code-generator"
  element={
    <ProtectedRoute>
      <ToolPage
        title="Code Generator"
        description="Generate clean and beginner-friendly code."
        defaultTask="Generate Code"
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/bug-detector"
  element={
    <ProtectedRoute>
      <ToolPage
        title="Bug Detector"
        description="Find errors and improve your code."
        defaultTask="Find Bugs"
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/sql-generator"
  element={
    <ProtectedRoute>
      <ToolPage
        title="SQL Generator"
        description="Generate SQL queries from plain English."
        defaultTask="Generate SQL Query"
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/resume-analyzer"
  element={
    <ProtectedRoute>
      <ToolPage
        title="Resume Analyzer"
        description="Analyze resumes and get improvement suggestions."
        defaultTask="Resume Analyzer"
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/documentation"
  element={
    <ProtectedRoute>
      <ToolPage
        title="Documentation Generator"
        description="Generate README and project documentation."
        defaultTask="Generate Documentation"
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview"
  element={
    <ProtectedRoute>
      <ToolPage
        title="Interview Questions"
        description="Generate interview questions and answers."
        defaultTask="Interview Question Generator"
      />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
    path="/chat"
    element={
        <ProtectedRoute>
            <AIChatPage />
        </ProtectedRoute>
    }
/>
        <Route
  path="/about"
  element={
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  }
/>
        <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;