import React, { useState, useMemo } from "react";
import { 
  Play, 
  Clock, 
  Layers, 
  Target, 
  Award, 
  CheckCircle2, 
  Flame, 
  History, 
  MessageSquare,
  ArrowRight,
  Sparkles,
  BarChart,
  BookOpen
} from "lucide-react";
import { getStudentAttempts } from "../services/storage";

export function StudentDashboard({ 
  user, 
  questions, 
  onStartQuiz 
}) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [questionCount, setQuestionCount] = useState(10);
  const [isTimed, setIsTimed] = useState(true);

  // Student history
  const attempts = useMemo(() => getStudentAttempts(user.id), [user.id]);

  // Unique topics from questions
  const availableTopics = useMemo(() => {
    const set = new Set();
    questions.forEach((q) => {
      if (q.topic) set.add(q.topic);
    });
    return Array.from(set).sort();
  }, [questions]);

  // Filtered pool matching selection
  const matchingPool = useMemo(() => {
    return questions.filter((q) => {
      const matchDiff =
        selectedDifficulty === "all" || q.level === selectedDifficulty;
      const matchTopic =
        selectedTopic === "all" || q.topic === selectedTopic;
      return matchDiff && matchTopic;
    });
  }, [questions, selectedDifficulty, selectedTopic]);

  // Ensure selected question count doesn't exceed pool
  const maxPossible = matchingPool.length;
  const effectiveCount = Math.min(questionCount, maxPossible || 1);

  // Quick stats
  const totalTaken = attempts.length;
  const bestScore = attempts.reduce((max, a) => Math.max(max, a.percentage), 0);
  const avgScore =
    totalTaken > 0
      ? Math.round(
          attempts.reduce((acc, a) => acc + a.percentage, 0) / totalTaken
        )
      : 0;

  const handleLaunch = () => {
    if (matchingPool.length === 0) return;
    onStartQuiz({
      difficulty: selectedDifficulty,
      topic: selectedTopic,
      count: effectiveCount,
      isTimed,
      pool: matchingPool
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome & Stats Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-purple-900/40 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              MERN Stack Mastery Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Test your knowledge across 120 curated questions covering MongoDB, Express, React, Node.js, REST APIs, and Mongoose.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center min-w-[90px]">
              <div className="text-xs text-slate-400 font-medium">Quizzes</div>
              <div className="text-xl font-bold text-white mt-1">{totalTaken}</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center min-w-[90px]">
              <div className="text-xs text-slate-400 font-medium">Best Score</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {totalTaken > 0 ? `${bestScore}%` : "-"}
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center min-w-[90px]">
              <div className="text-xs text-slate-400 font-medium">Avg Score</div>
              <div className="text-xl font-bold text-indigo-400 mt-1">
                {totalTaken > 0 ? `${avgScore}%` : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quiz Configurator (Left 2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Configure Your Quiz</h2>
                <p className="text-xs text-slate-400">
                  Select difficulty, focus topic, and questions quantity
                </p>
              </div>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {matchingPool.length} Questions Available
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              1. Choose Difficulty Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "all", label: "All Levels", count: questions.length, color: "hover:border-indigo-500" },
                { id: "easy", label: "Easy", count: 40, color: "hover:border-emerald-500" },
                { id: "medium", label: "Medium", count: 40, color: "hover:border-amber-500" },
                { id: "hard", label: "Hard", count: 40, color: "hover:border-rose-500" }
              ].map((lvl) => {
                const isActive = selectedDifficulty === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedDifficulty(lvl.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isActive
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 " + lvl.color
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{lvl.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {lvl.id === "all" ? `${questions.length} Qs` : `40 Questions`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              2. Select Topic Focus
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedTopic("all")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedTopic === "all"
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                All Topics ({questions.length})
              </button>
              {availableTopics.map((top) => {
                const isActive = selectedTopic === top;
                const count = questions.filter((q) => q.topic === top).length;
                return (
                  <button
                    key={top}
                    type="button"
                    onClick={() => setSelectedTopic(top)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    {top} <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Count & Timer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                3. Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 20, 40].map((num) => (
                  <button
                    key={num}
                    type="button"
                    disabled={matchingPool.length < num}
                    onClick={() => setQuestionCount(num)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      questionCount === num
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : matchingPool.length < num
                        ? "bg-slate-950/30 border-slate-800/50 text-slate-600 cursor-not-allowed"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                4. Quiz Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsTimed(true)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-all ${
                    isTimed
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "bg-slate-950/60 border-slate-800 text-slate-400"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Timed (1m/Q)
                </button>
                <button
                  type="button"
                  onClick={() => setIsTimed(false)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-all ${
                    !isTimed
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "bg-slate-950/60 border-slate-800 text-slate-400"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  Untimed
                </button>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              type="button"
              disabled={matchingPool.length === 0}
              onClick={handleLaunch}
              className="w-full py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99] disabled:opacity-50"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>
                Start Quiz Now ({effectiveCount} Questions • {isTimed ? `${effectiveCount} mins` : "Practice"})
              </span>
            </button>
          </div>
        </div>

        {/* Attempt History & Teacher Remarks (Right col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <History className="w-4 h-4 text-indigo-400" />
              Your Quiz History
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {attempts.length} record{attempts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {attempts.length === 0 ? (
            <div className="my-auto py-12 text-center text-slate-500">
              <Award className="w-12 h-12 mx-auto mb-3 opacity-30 text-indigo-400" />
              <p className="text-sm font-medium text-slate-400">No attempts yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Configure your first quiz and test your skills!
              </p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
              {attempts.map((att) => {
                const isPass = att.percentage >= 60;
                return (
                  <div
                    key={att.id}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            att.difficulty === "easy"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : att.difficulty === "medium"
                              ? "bg-amber-500/20 text-amber-300"
                              : att.difficulty === "hard"
                              ? "bg-rose-500/20 text-rose-300"
                              : "bg-indigo-500/20 text-indigo-300"
                          } uppercase tracking-wider text-[10px]`}
                        >
                          {att.difficulty}
                        </span>
                        <span className="text-xs text-slate-300 font-medium truncate max-w-[130px]">
                          {att.topic}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-extrabold ${
                          isPass ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {att.percentage}% ({att.score}/{att.totalQuestions})
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{new Date(att.completedAt).toLocaleDateString()}</span>
                      <span>{Math.round(att.timeSpentSeconds / 60)} min {att.timeSpentSeconds % 60}s</span>
                    </div>

                    {/* Teacher Feedback Callout */}
                    {att.teacherFeedback && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                        <div className="flex items-center gap-1 font-semibold text-amber-400 mb-0.5">
                          <MessageSquare className="w-3 h-3" />
                          Teacher Evaluation Note:
                        </div>
                        <p className="italic">"{att.teacherFeedback}"</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
