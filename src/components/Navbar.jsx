import React from "react";
import { 
  GraduationCap, 
  BookOpen, 
  UserCheck, 
  LogOut, 
  Sparkles, 
  BarChart3, 
  HelpCircle,
  Database
} from "lucide-react";

export function Navbar({ 
  user, 
  onLogout, 
  currentView, 
  setCurrentView 
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView("dashboard")} 
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">MERN QuizHub</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                120 Questions
              </span>
            </div>
            <p className="text-xs text-slate-400">Master Full-Stack JavaScript</p>
          </div>
        </div>

        {/* Navigation Tabs (For Teacher role) */}
        {user && user.role === "teacher" && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === "dashboard"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Evaluation & Analytics
            </button>
            <button
              onClick={() => setCurrentView("question_bank")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === "question_bank"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Question Pool & Free API
            </button>
            <button
              onClick={() => setCurrentView("api_explorer")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === "api_explorer"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Free REST API
            </button>
          </nav>
        )}

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-200">{user.name}</div>
                <div className="flex items-center justify-end gap-1.5 text-xs">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      user.role === "teacher" ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                  <span className="capitalize text-slate-400 font-medium">
                    {user.role} Account
                  </span>
                </div>
              </div>

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                  user.role === "teacher"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                }`}
              >
                {user.role === "teacher" ? "T" : "S"}
              </div>

              <button
                onClick={onLogout}
                title="Sign out"
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Please Sign In</div>
          )}
        </div>
      </div>
    </header>
  );
}
