import React, { useState, useMemo } from "react";
import { 
  Users, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Search, 
  Download, 
  MessageSquare, 
  Sparkles, 
  Database, 
  ExternalLink, 
  Plus, 
  Trash2, 
  AlertCircle,
  HelpCircle,
  Clock,
  RefreshCw,
  Code2,
  Copy,
  Check
} from "lucide-react";
import { 
  getAllAttempts, 
  updateAttemptFeedback, 
  addQuestions, 
  deleteQuestion, 
  resetQuestionsToDefault 
} from "../services/storage";
import { fetchExternalTrivia } from "../services/freeApi";

export function TeacherDashboard({ 
  user, 
  questions, 
  setQuestions, 
  activeTab = "dashboard" 
}) {
  const [attempts, setAttempts] = useState(() => getAllAttempts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedAttemptForReview, setSelectedAttemptForReview] = useState(null);
  const [evaluationFeedback, setEvaluationFeedback] = useState("");
  const [feedbackSuccessMsg, setFeedbackSuccessMsg] = useState("");

  // Free API Importer state
  const [apiAmount, setApiAmount] = useState(5);
  const [apiDifficulty, setApiDifficulty] = useState("");
  const [isFetchingApi, setIsFetchingApi] = useState(false);
  const [fetchedApiQuestions, setFetchedApiQuestions] = useState([]);
  const [apiSuccessMsg, setApiSuccessMsg] = useState("");

  // REST API Explorer state
  const [selectedEndpoint, setSelectedEndpoint] = useState("/api/questions");
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  // Class KPI Metrics
  const totalAttemptsCount = attempts.length;
  const avgScore = totalAttemptsCount > 0
    ? Math.round(attempts.reduce((acc, a) => acc + a.percentage, 0) / totalAttemptsCount)
    : 0;
  const passingCount = attempts.filter((a) => a.percentage >= 60).length;
  const passRate = totalAttemptsCount > 0 ? Math.round((passingCount / totalAttemptsCount) * 100) : 0;
  const topScore = attempts.reduce((max, a) => Math.max(max, a.percentage), 0);

  // Filtered student attempts
  const filteredAttempts = useMemo(() => {
    return attempts.filter((att) => {
      const matchSearch =
        att.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDiff =
        selectedDifficulty === "all" || att.difficulty === selectedDifficulty;
      return matchSearch && matchDiff;
    });
  }, [attempts, searchQuery, selectedDifficulty]);

  // Handle open review modal
  const handleOpenReview = (att) => {
    setSelectedAttemptForReview(att);
    setEvaluationFeedback(att.teacherFeedback || "");
    setFeedbackSuccessMsg("");
  };

  // Handle save teacher evaluation remarks
  const handleSaveFeedback = (e) => {
    e.preventDefault();
    if (!selectedAttemptForReview) return;
    const updated = updateAttemptFeedback(selectedAttemptForReview.id, evaluationFeedback);
    if (updated) {
      setAttempts(getAllAttempts());
      setSelectedAttemptForReview(updated);
      setFeedbackSuccessMsg("Feedback saved successfully! The student can now see your remarks.");
      setTimeout(() => setFeedbackSuccessMsg(""), 3500);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (attempts.length === 0) return;
    const headers = ["Attempt ID", "Student Name", "Email", "Difficulty", "Topic", "Score", "Total Questions", "Percentage", "Time (seconds)", "Date", "Teacher Feedback"];
    const rows = attempts.map((a) => [
      a.id,
      `"${a.studentName}"`,
      `"${a.studentEmail}"`,
      a.difficulty,
      `"${a.topic}"`,
      a.score,
      a.totalQuestions,
      `${a.percentage}%`,
      a.timeSpentSeconds,
      new Date(a.completedAt).toISOString(),
      `"${(a.teacherFeedback || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mern_quiz_performance_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Free API Question Fetch
  const handleFetchFromFreeApi = async () => {
    setIsFetchingApi(true);
    setApiSuccessMsg("");
    try {
      const result = await fetchExternalTrivia(apiAmount, apiDifficulty);
      setFetchedApiQuestions(result);
    } catch (err) {
      alert("Failed to fetch questions from external API.");
    } finally {
      setIsFetchingApi(false);
    }
  };

  // Add fetched questions to active question bank
  const handleImportToBank = () => {
    if (fetchedApiQuestions.length === 0) return;
    const updated = addQuestions(fetchedApiQuestions);
    setQuestions(updated);
    setApiSuccessMsg(`Successfully imported ${fetchedApiQuestions.length} live questions into the quiz pool!`);
    setFetchedApiQuestions([]);
    setTimeout(() => setApiSuccessMsg(""), 4000);
  };

  // Reset question pool
  const handleResetQuestions = () => {
    if (window.confirm("Reset question pool to the original 120 MERN questions?")) {
      const reset = resetQuestionsToDefault();
      setQuestions(reset);
      alert("Reset to original 120 questions.");
    }
  };

  // Endpoint Mock responses for REST API Explorer
  const apiExplorerData = useMemo(() => {
    if (selectedEndpoint === "/api/questions") {
      return {
        status: 200,
        totalQuestions: questions.length,
        sample: questions.slice(0, 3)
      };
    }
    if (selectedEndpoint === "/api/scores") {
      return {
        status: 200,
        totalAttempts: attempts.length,
        attempts: attempts
      };
    }
    if (selectedEndpoint === "/api/stats") {
      return {
        status: 200,
        metrics: {
          totalAttemptsCount,
          averageScore: `${avgScore}%`,
          passRate: `${passRate}%`,
          highestScore: `${topScore}%`,
          activeQuestionBankSize: questions.length
        }
      };
    }
    return {};
  }, [selectedEndpoint, questions, attempts, totalAttemptsCount, avgScore, passRate, topScore]);

  const copyApiData = () => {
    navigator.clipboard.writeText(JSON.stringify(apiExplorerData, null, 2));
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Teacher Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Award className="w-4 h-4" />
            Teacher Evaluation & Management Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Class Performance Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Welcome, {user.name}. Evaluate student performance, provide feedback, and manage question pools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={attempts.length === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Attempts</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalAttemptsCount}</div>
          <div className="text-[11px] text-slate-500">Across enrolled students</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Class Average</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{avgScore}%</div>
          <div className="text-[11px] text-slate-500">Overall student average</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pass Rate (≥60%)</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{passRate}%</div>
          <div className="text-[11px] text-slate-500">{passingCount} out of {totalAttemptsCount} passed</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Questions</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">{questions.length}</div>
          <div className="text-[11px] text-slate-500">120 Base + Free API items</div>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Student Submissions & Evaluation Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Student Quiz Submissions</h2>
                <p className="text-xs text-slate-400">
                  Select any submission to view their complete answer sheet and write teacher evaluation remarks.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Submissions Table */}
            {filteredAttempts.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-30 text-indigo-400" />
                <p className="text-sm font-medium text-slate-400">No student submissions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="py-3 px-3">Student</th>
                      <th className="py-3 px-3">Quiz Topic & Level</th>
                      <th className="py-3 px-3">Score & Accuracy</th>
                      <th className="py-3 px-3">Time</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Evaluation Remarks</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredAttempts.map((att) => {
                      const isPass = att.percentage >= 60;
                      return (
                        <tr key={att.id} className="hover:bg-slate-950/40 transition-colors">
                          <td className="py-3.5 px-3">
                            <div className="font-semibold text-white">{att.studentName}</div>
                            <div className="text-[11px] text-slate-500">{att.studentEmail}</div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="text-slate-300 font-medium">{att.topic}</div>
                            <span className="text-[10px] uppercase font-bold text-slate-500">
                              {att.difficulty}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-bold px-2 py-0.5 rounded ${
                                  isPass
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : "bg-rose-500/20 text-rose-300"
                                }`}
                              >
                                {att.percentage}%
                              </span>
                              <span className="text-slate-400">
                                ({att.score}/{att.totalQuestions})
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-slate-400">
                            {Math.round(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                          </td>
                          <td className="py-3.5 px-3 text-slate-400">
                            {new Date(att.completedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-3">
                            {att.teacherFeedback ? (
                              <span className="text-amber-300 italic truncate max-w-[180px] block" title={att.teacherFeedback}>
                                "{att.teacherFeedback}"
                              </span>
                            ) : (
                              <span className="text-slate-600">Pending review</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button
                              onClick={() => handleOpenReview(att)}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-medium text-[11px] border border-indigo-500/30 transition-all"
                            >
                              Evaluate Sheet
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Question Bank & Free API Importer Tab */}
      {activeTab === "question_bank" && (
        <div className="space-y-8">
          {/* Free API Question Importer Section */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Free API Integration (Open Trivia DB)
                </div>
                <h2 className="text-xl font-bold text-white">Import Questions via Free API</h2>
                <p className="text-xs text-slate-400 max-w-xl">
                  Fetch live Computer Science and Web Development questions from Open Trivia Database API (no API key required) and add them to your active quiz bank.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetQuestions}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  Reset to 120 Questions
                </button>
              </div>
            </div>

            {/* API Fetch Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Questions Count
                </label>
                <select
                  value={apiAmount}
                  onChange={(e) => setApiAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Difficulty
                </label>
                <select
                  value={apiDifficulty}
                  onChange={(e) => setApiDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleFetchFromFreeApi}
                  disabled={isFetchingApi}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFetchingApi ? "animate-spin" : ""}`} />
                  <span>{isFetchingApi ? "Fetching API..." : "Fetch from Free API"}</span>
                </button>
              </div>
            </div>

            {/* Success Message */}
            {apiSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{apiSuccessMsg}</span>
              </div>
            )}

            {/* Preview of Fetched Questions */}
            {fetchedApiQuestions.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Preview: {fetchedApiQuestions.length} Questions Fetched
                  </h3>
                  <button
                    onClick={handleImportToBank}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add All to Active Pool</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {fetchedApiQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-400">Q{idx + 1}.</span>
                        <span className="font-medium text-white">{q.question}</span>
                      </div>
                      <div className="text-emerald-400 font-semibold text-[11px] pl-5">
                        Answer: {q.options[q.answer]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Question Bank List */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Active Question Bank ({questions.length} questions)
                </h3>
                <p className="text-xs text-slate-400">
                  Includes 120 standard MERN questions plus any imported items
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {questions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-400">#{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                        {q.topic}
                      </span>
                      <span className="px-2 py-0.5 rounded capitalize bg-slate-800 text-slate-400 text-[10px]">
                        {q.level}
                      </span>
                      {q.isExternal && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                          Free API
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-white pt-1">{q.question}</p>
                    <p className="text-emerald-400 text-[11px]">
                      Correct: {q.options[q.answer]}
                    </p>
                  </div>

                  {q.isExternal && (
                    <button
                      onClick={() => {
                        const updated = deleteQuestion(q.id);
                        setQuestions(updated);
                      }}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors shrink-0"
                      title="Remove question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Free REST API Explorer Tab */}
      {activeTab === "api_explorer" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-2">
                <Code2 className="w-3.5 h-3.5" />
                Interactive Free REST API Explorer
              </div>
              <h2 className="text-xl font-bold text-white">Quiz REST API Endpoints</h2>
              <p className="text-xs text-slate-400">
                Explore and copy live JSON payloads generated by MERN QuizHub for testing and external integrations.
              </p>
            </div>

            <button
              onClick={copyApiData}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
            >
              {copiedEndpoint ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEndpoint ? "Copied JSON!" : "Copy JSON Response"}</span>
            </button>
          </div>

          {/* Endpoints Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { path: "/api/questions", label: "GET /api/questions", desc: "Retrieve active questions" },
              { path: "/api/scores", label: "GET /api/scores", desc: "Retrieve student attempt logs" },
              { path: "/api/stats", label: "GET /api/stats", desc: "Retrieve class performance metrics" }
            ].map((ep) => (
              <button
                key={ep.path}
                onClick={() => setSelectedEndpoint(ep.path)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all text-left ${
                  selectedEndpoint === ep.path
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <div>{ep.label}</div>
                <div className="text-[10px] font-sans text-slate-400 font-normal mt-0.5">
                  {ep.desc}
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[450px]">
            <pre>{JSON.stringify(apiExplorerData, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Evaluation & Review Sheet Modal */}
      {selectedAttemptForReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col space-y-6 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Evaluation Sheet: {selectedAttemptForReview.studentName}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedAttemptForReview.topic} • {selectedAttemptForReview.difficulty} • Score:{" "}
                  <span className="font-bold text-indigo-400">
                    {selectedAttemptForReview.score}/{selectedAttemptForReview.totalQuestions} (
                    {selectedAttemptForReview.percentage}%)
                  </span>
                </p>
              </div>

              <button
                onClick={() => setSelectedAttemptForReview(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Teacher Feedback Remark Form */}
            <form onSubmit={handleSaveFeedback} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <MessageSquare className="w-4 h-4" />
                <span>Teacher Evaluation Feedback & Guidance</span>
              </div>
              <textarea
                rows={2}
                placeholder="Write customized teacher evaluation feedback for this student..."
                value={evaluationFeedback}
                onChange={(e) => setEvaluationFeedback(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <div className="flex items-center justify-between">
                {feedbackSuccessMsg ? (
                  <span className="text-emerald-400 text-xs font-medium">{feedbackSuccessMsg}</span>
                ) : (
                  <span className="text-slate-500 text-[11px]">
                    Feedback is stored and visible on the student's dashboard.
                  </span>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/25 transition-all"
                >
                  Save Evaluation Remarks
                </button>
              </div>
            </form>

            {/* Answer Sheet Review (Scrollable) */}
            <div className="overflow-y-auto space-y-4 pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Student Answers Breakdown
              </h4>
              {selectedAttemptForReview.questions ? (
                selectedAttemptForReview.questions.map((q, idx) => {
                  const userAns = selectedAttemptForReview.selectedAnswers
                    ? selectedAttemptForReview.selectedAnswers[idx]
                    : undefined;
                  const isCorrect = userAns === q.answer;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border text-xs space-y-2 ${
                        isCorrect
                          ? "bg-emerald-950/15 border-emerald-500/20"
                          : "bg-rose-950/15 border-rose-500/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">
                          Q{idx + 1}. {q.question}
                        </span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            isCorrect
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {isCorrect ? "Correct (+1)" : "Incorrect (0)"}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Student Choice:{" "}
                        <span className="text-white font-semibold">
                          {userAns !== undefined ? q.options[userAns] : "Skipped"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-400 text-[11px]">
                          Correct Answer: <span className="font-semibold">{q.options[q.answer]}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-slate-500 text-xs">
                  Summary attempt record: {selectedAttemptForReview.score}/{selectedAttemptForReview.totalQuestions} correct ({selectedAttemptForReview.percentage}%)
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
