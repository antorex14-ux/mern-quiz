import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { AuthModal } from "./components/AuthModal";
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { QuizRunner } from "./components/QuizRunner";
import { QuizResults } from "./components/QuizResults";
import { 
  initStorage, 
  getCurrentUser, 
  setCurrentUser, 
  logoutUser, 
  getStoredQuestions, 
  saveQuizAttempt, 
  loginUser 
} from "./services/storage";
import { ShieldCheck, GraduationCap, ArrowRightLeft } from "lucide-react";

export function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard' | 'question_bank' | 'api_explorer' | 'quiz_running' | 'quiz_results'
  const [activeQuizConfig, setActiveQuizConfig] = useState(null);
  const [activeQuizResult, setActiveQuizResult] = useState(null);

  // Initialize storage and load session
  useEffect(() => {
    initStorage();
    const storedUser = getCurrentUser();
    setUser(storedUser);
    setQuestions(getStoredQuestions());
  }, []);

  // Auth Handlers
  const handleAuthSuccess = (loggedUser) => {
    setUser(loggedUser);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setActiveQuizConfig(null);
    setActiveQuizResult(null);
    setCurrentView("dashboard");
  };

  // Quick switch role (helper for testing both student & teacher perspectives)
  const handleQuickSwitchRole = (targetRole) => {
    try {
      if (targetRole === "teacher") {
        const teacherUser = loginUser("sarah@teacher.edu", "admin", "teacher");
        setUser(teacherUser);
        setCurrentView("dashboard");
      } else {
        const studentUser = loginUser("alex@student.edu", "password123", "student");
        setUser(studentUser);
        setCurrentView("dashboard");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Launch Quiz
  const handleStartQuiz = ({ difficulty, topic, count, isTimed, pool }) => {
    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, count);

    setActiveQuizConfig({
      questions: selectedQuestions,
      difficulty,
      topic,
      isTimed
    });
    setCurrentView("quiz_running");
  };

  // Finish Quiz & Save Results
  const handleFinishQuiz = ({ selectedAnswers, timeSpentSeconds, questions: quizQuestions }) => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        score += 1;
      }
    });

    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Save attempt to storage
    const newAttempt = saveQuizAttempt({
      studentId: user?.id || "anonymous",
      studentName: user?.name || "Anonymous Student",
      studentEmail: user?.email || "student@school.edu",
      difficulty: activeQuizConfig?.difficulty || "all",
      topic: activeQuizConfig?.topic || "All Topics",
      totalQuestions,
      score,
      percentage,
      timeSpentSeconds,
      selectedAnswers,
      questions: quizQuestions,
      teacherFeedback: ""
    });

    setActiveQuizResult({
      attemptId: newAttempt.id,
      score,
      totalQuestions,
      percentage,
      timeSpentSeconds,
      questions: quizQuestions,
      selectedAnswers
    });

    setCurrentView("quiz_results");
  };

  // Retake current quiz
  const handleRetakeQuiz = () => {
    if (activeQuizConfig) {
      setCurrentView("quiz_running");
    } else {
      setCurrentView("dashboard");
    }
  };

  // Cancel / return
  const handleCancelQuiz = () => {
    setActiveQuizConfig(null);
    setCurrentView("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Quick Role Switcher Bar (Demo Floating Toolbar) */}
      {user && (
        <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-amber-950/80 border-b border-slate-800/80 px-4 py-1.5 text-xs flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Active Role:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded ${
                user.role === "teacher"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              } uppercase text-[10px] tracking-wider`}
            >
              {user.role} ({user.name})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[11px] text-slate-500">
              Quick Switch Role:
            </span>
            {user.role === "student" ? (
              <button
                onClick={() => handleQuickSwitchRole("teacher")}
                className="px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors font-medium text-[11px]"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Switch to Teacher (Prof. Davis)</span>
              </button>
            ) : (
              <button
                onClick={() => handleQuickSwitchRole("student")}
                className="px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors font-medium text-[11px]"
              >
                <GraduationCap className="w-3 h-3" />
                <span>Switch to Student (Alex Rivera)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main App Body */}
      <main className="flex-1 pb-16">
        {!user ? (
          <AuthModal onAuthSuccess={handleAuthSuccess} />
        ) : currentView === "quiz_running" && activeQuizConfig ? (
          <QuizRunner
            quizConfig={activeQuizConfig}
            onFinishQuiz={handleFinishQuiz}
            onCancelQuiz={handleCancelQuiz}
          />
        ) : currentView === "quiz_results" && activeQuizResult ? (
          <QuizResults
            result={activeQuizResult}
            onRetakeQuiz={handleRetakeQuiz}
            onReturnDashboard={() => setCurrentView("dashboard")}
          />
        ) : user.role === "teacher" ? (
          <TeacherDashboard
            user={user}
            questions={questions}
            setQuestions={setQuestions}
            activeTab={currentView}
          />
        ) : (
          <StudentDashboard
            user={user}
            questions={questions}
            onStartQuiz={handleStartQuiz}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MERN QuizHub • 120 Curated Questions & Performance Analytics</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Student Portal</span>
            <span>•</span>
            <span>Teacher Evaluation</span>
            <span>•</span>
            <span>Free OpenTDB API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
