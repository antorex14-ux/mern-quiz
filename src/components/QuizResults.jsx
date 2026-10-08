import React, { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { 
  Trophy, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Home, 
  HelpCircle, 
  Sparkles, 
  BarChart2, 
  Filter,
  Quote
} from "lucide-react";
import { fetchMotivationalAdvice } from "../services/freeApi";

export function QuizResults({ 
  result, 
  onRetakeQuiz, 
  onReturnDashboard 
}) {
  const { 
    score, 
    totalQuestions, 
    percentage, 
    timeSpentSeconds, 
    questions, 
    selectedAnswers 
  } = result;

  const [advice, setAdvice] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'correct' | 'wrong'

  // Trigger confetti for high score (>= 75%)
  useEffect(() => {
    if (percentage >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }
    }
  }, [percentage]);

  // Fetch free advice from Advice Slip Free API
  useEffect(() => {
    let mounted = true;
    fetchMotivationalAdvice().then((text) => {
      if (mounted) setAdvice(text);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Compute topic-wise breakdown
  const topicStats = useMemo(() => {
    const stats = {};
    questions.forEach((q, idx) => {
      const topic = q.topic || "General";
      if (!stats[topic]) {
        stats[topic] = { total: 0, correct: 0 };
      }
      stats[topic].total += 1;
      if (selectedAnswers[idx] === q.answer) {
        stats[topic].correct += 1;
      }
    });
    return Object.entries(stats).map(([topic, data]) => ({
      topic,
      total: data.total,
      correct: data.correct,
      pct: Math.round((data.correct / data.total) * 100)
    }));
  }, [questions, selectedAnswers]);

  // Filter questions for review
  const filteredQuestions = useMemo(() => {
    return questions
      .map((q, idx) => {
        const userAnswer = selectedAnswers[idx];
        const isCorrect = userAnswer === q.answer;
        return { ...q, originalIndex: idx, userAnswer, isCorrect };
      })
      .filter((item) => {
        if (filterMode === "correct") return item.isCorrect;
        if (filterMode === "wrong") return !item.isCorrect;
        return true;
      });
  }, [questions, selectedAnswers, filterMode]);

  const wrongCount = totalQuestions - score;
  const isPass = percentage >= 60;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Scorecard Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 text-center shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-1 shadow-inner">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {percentage >= 90
              ? "Outstanding! MERN Mastery! 🎉"
              : percentage >= 70
              ? "Great Job! Well Done! 👏"
              : percentage >= 50
              ? "Good Effort! Keep Practicing! 💡"
              : "Keep Studying & Try Again! 📚"}
          </h1>

          {/* Big Score Numbers */}
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="text-center">
              <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                {percentage}%
              </span>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-semibold">
                Accuracy Score
              </p>
            </div>
          </div>

          {/* Key Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-emerald-400 font-extrabold text-lg">{score}</div>
              <div className="text-[11px] text-slate-400 font-medium">Correct</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-rose-400 font-extrabold text-lg">{wrongCount}</div>
              <div className="text-[11px] text-slate-400 font-medium">Incorrect</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-indigo-400 font-extrabold text-lg">{totalQuestions}</div>
              <div className="text-[11px] text-slate-400 font-medium">Total Qs</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-200 font-extrabold text-lg">
                {Math.round(timeSpentSeconds / 60)}m {timeSpentSeconds % 60}s
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Time Taken</div>
            </div>
          </div>

          {/* Motivational Advice from Free API */}
          {advice && (
            <div className="mt-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 max-w-xl mx-auto flex items-center gap-3 text-left">
              <Quote className="w-5 h-5 shrink-0 text-indigo-400 opacity-60" />
              <div>
                <span className="font-semibold text-indigo-300 block text-[10px] uppercase tracking-wider">
                  Wisdom of the Day (Free Advice API)
                </span>
                <span className="italic">"{advice}"</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onRetakeQuiz}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onReturnDashboard}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Topic Mastery Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-800 pb-3">
          <BarChart2 className="w-5 h-5 text-indigo-400" />
          <span>Topic Mastery Breakdown</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicStats.map((item) => (
            <div
              key={item.topic}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{item.topic}</span>
                <span className="text-slate-400">
                  {item.correct}/{item.total} ({item.pct}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.pct >= 80
                      ? "bg-emerald-500"
                      : item.pct >= 50
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Question Review */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Question by Question Review</h2>
            <p className="text-xs text-slate-400">
              Verify your answers and read comprehensive explanations
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === "all"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode("correct")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === "correct"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Correct ({score})
            </button>
            <button
              onClick={() => setFilterMode("wrong")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterMode === "wrong"
                  ? "bg-rose-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Wrong ({wrongCount})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const isUnanswered = q.userAnswer === undefined;
            return (
              <div
                key={q.originalIndex}
                className={`p-6 rounded-2xl border transition-all space-y-4 ${
                  q.isCorrect
                    ? "bg-emerald-950/10 border-emerald-500/20"
                    : "bg-rose-950/10 border-rose-500/20"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      Q{q.originalIndex + 1}.
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {q.topic}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded capitalize bg-slate-800 text-slate-400">
                      {q.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {q.isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Correct (+1)
                      </span>
                    ) : isUnanswered ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" /> Skipped (0)
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect (0)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question */}
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {q.question}
                </p>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isRight = optIdx === q.answer;
                    const isUserChoice = optIdx === q.userAnswer;

                    let cardClass = "bg-slate-950/40 border-slate-800/80 text-slate-400";
                    if (isRight) {
                      cardClass = "bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-semibold";
                    } else if (isUserChoice && !isRight) {
                      cardClass = "bg-rose-500/15 border-rose-500/50 text-rose-200 font-semibold";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${cardClass}`}
                      >
                        <span className="flex-1">{opt}</span>
                        {isRight && (
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider shrink-0 bg-emerald-500/20 px-2 py-0.5 rounded">
                            Correct Answer
                          </span>
                        )}
                        {isUserChoice && !isRight && (
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider shrink-0 bg-rose-500/20 px-2 py-0.5 rounded">
                            Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-indigo-400 block mb-1">
                      Explanation:
                    </span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
