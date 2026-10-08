import { initialQuestions } from "../data/questions";

const KEYS = {
  USERS: "mern_quiz_users",
  CURRENT_USER: "mern_quiz_current_user",
  QUESTIONS: "mern_quiz_questions",
  ATTEMPTS: "mern_quiz_attempts"
};

// Default seed users
const DEFAULT_USERS = [
  {
    id: "stu-1",
    name: "Alex Rivera",
    email: "alex@student.edu",
    password: "password123",
    role: "student"
  },
  {
    id: "stu-2",
    name: "Samantha Chen",
    email: "samantha@student.edu",
    password: "password123",
    role: "student"
  },
  {
    id: "stu-3",
    name: "Marcus Johnson",
    email: "marcus@student.edu",
    password: "password123",
    role: "student"
  },
  {
    id: "teach-1",
    name: "Prof. Sarah Davis",
    email: "sarah@teacher.edu",
    password: "admin",
    role: "teacher"
  }
];

// Default sample attempts for initial dashboard visualization
const DEFAULT_ATTEMPTS = [
  {
    id: "att-sample-1",
    studentId: "stu-2",
    studentName: "Samantha Chen",
    studentEmail: "samantha@student.edu",
    difficulty: "medium",
    topic: "All Topics",
    totalQuestions: 15,
    score: 13,
    percentage: 87,
    timeSpentSeconds: 420,
    completedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    teacherFeedback: "Excellent grasp of Mongoose schemas and React props!",
    answersSummary: { correct: 13, wrong: 2, total: 15 }
  },
  {
    id: "att-sample-2",
    studentId: "stu-3",
    studentName: "Marcus Johnson",
    studentEmail: "marcus@student.edu",
    difficulty: "hard",
    topic: "Express.js",
    totalQuestions: 10,
    score: 6,
    percentage: 60,
    timeSpentSeconds: 310,
    completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    teacherFeedback: "Needs to review error-handling middleware signatures (err, req, res, next).",
    answersSummary: { correct: 6, wrong: 4, total: 10 }
  },
  {
    id: "att-sample-3",
    studentId: "stu-1",
    studentName: "Alex Rivera",
    studentEmail: "alex@student.edu",
    difficulty: "easy",
    topic: "React",
    totalQuestions: 10,
    score: 10,
    percentage: 100,
    timeSpentSeconds: 195,
    completedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    teacherFeedback: "Perfect score on basic React components and state!",
    answersSummary: { correct: 10, wrong: 0, total: 10 }
  }
];

// Initialize default storage data
export function initStorage() {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem(KEYS.QUESTIONS)) {
    localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(initialQuestions));
  }
  if (!localStorage.getItem(KEYS.ATTEMPTS)) {
    localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(DEFAULT_ATTEMPTS));
  }
}

// ----------------- Auth & Users -----------------

export function getUsers() {
  try {
    const raw = localStorage.getItem(KEYS.USERS);
    return raw ? JSON.parse(raw) : DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

export function loginUser(email, password, role) {
  const users = getUsers();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password === password &&
      (!role || u.role === role)
  );
  if (!found) {
    throw new Error("Invalid email, password, or role selection.");
  }
  setCurrentUser(found);
  return found;
}

export function registerUser({ name, email, password, role }) {
  const users = getUsers();
  const exists = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  );
  if (exists) {
    throw new Error("An account with this email already exists.");
  }
  const newUser = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: role || "student"
  };
  users.push(newUser);
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  setCurrentUser(newUser);
  return newUser;
}

export function logoutUser() {
  localStorage.removeItem(KEYS.CURRENT_USER);
}

// ----------------- Questions Management -----------------

export function getStoredQuestions() {
  try {
    const raw = localStorage.getItem(KEYS.QUESTIONS);
    return raw ? JSON.parse(raw) : initialQuestions;
  } catch (e) {
    return initialQuestions;
  }
}

export function addQuestions(newQuestions) {
  const current = getStoredQuestions();
  const updated = [...current, ...newQuestions];
  localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(updated));
  return updated;
}

export function deleteQuestion(id) {
  const current = getStoredQuestions();
  const updated = current.filter((q) => q.id !== id);
  localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(updated));
  return updated;
}

export function resetQuestionsToDefault() {
  localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(initialQuestions));
  return initialQuestions;
}

// ----------------- Attempts & Evaluation -----------------

export function getAllAttempts() {
  try {
    const raw = localStorage.getItem(KEYS.ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getStudentAttempts(studentId) {
  const all = getAllAttempts();
  return all.filter((a) => a.studentId === studentId);
}

export function saveQuizAttempt(attemptData) {
  const all = getAllAttempts();
  const newAttempt = {
    id: `att-${Date.now()}`,
    completedAt: new Date().toISOString(),
    ...attemptData
  };
  all.unshift(newAttempt);
  localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(all));
  return newAttempt;
}

export function updateAttemptFeedback(attemptId, teacherFeedback) {
  const all = getAllAttempts();
  const index = all.findIndex((a) => a.id === attemptId);
  if (index !== -1) {
    all[index].teacherFeedback = teacherFeedback;
    localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(all));
    return all[index];
  }
  return null;
}
