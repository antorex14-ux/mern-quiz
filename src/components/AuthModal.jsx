import React, { useState } from "react";
import { 
  GraduationCap, 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  Zap, 
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { loginUser, registerUser } from "../services/storage";

export function AuthModal({ onAuthSuccess }) {
  const [role, setRole] = useState("student"); // 'student' | 'teacher'
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error("Please enter your name.");
        if (!email.trim()) throw new Error("Please enter your email.");
        if (!password) throw new Error("Please enter a password.");

        const user = await registerUser({ name, email, password, role });
        onAuthSuccess(user);
      } else {
        if (!email.trim() || !password) {
          throw new Error("Please enter both email and password.");
        }
        const user = await loginUser(email, password, role);
        onAuthSuccess(user);
      }
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  // Instant Demo Logins
  const handleDemoStudent = async () => {
    try {
      setLoading(true);
      const user = await loginUser("alex@student.edu", "password123", "student");
      onAuthSuccess(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoTeacher = async () => {
    try {
      setLoading(true);
      const user = await loginUser("sarah@teacher.edu", "admin", "teacher");
      onAuthSuccess(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3">
            {role === "teacher" ? (
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            ) : (
              <GraduationCap className="w-8 h-8 text-indigo-400" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isRegister ? "Create Your Account" : "Sign In to MERN QuizHub"}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {role === "teacher"
              ? "Teacher Portal: Evaluate student performance & question analytics"
              : "Student Portal: Attempt 120 MERN questions and view scores"}
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-950/70 rounded-xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setRole("student");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              role === "student"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Student Login
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("teacher");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              role === "teacher"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Teacher Login
          </button>
        </div>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Instant 1-Click Demo Login
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoStudent}
              className="px-3 py-2 text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Demo Student</span>
              <span className="text-[10px] text-emerald-400/80">Alex</span>
            </button>
            <button
              type="button"
              onClick={handleDemoTeacher}
              className="px-3 py-2 text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Demo Teacher</span>
              <span className="text-[10px] text-amber-400/80">Prof. Davis</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder={role === "teacher" ? "teacher@school.edu" : "student@school.edu"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-sm text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
              role === "teacher"
                ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/25"
                : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25"
            } disabled:opacity-50`}
          >
            <span>{isRegister ? "Create Account" : `Sign In as ${role === "teacher" ? "Teacher" : "Student"}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Login / Register */}
        <div className="text-center mt-5 text-xs text-slate-400">
          {isRegister ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2 ml-1"
          >
            {isRegister ? "Sign in instead" : "Register here"}
          </button>
        </div>
      </div>
    </div>
  );
}
