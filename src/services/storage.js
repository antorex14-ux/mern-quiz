import { initialQuestions } from "../data/questions";
import { generateSalt, hashPassword, verifyPassword } from "./crypto";

const KEYS = {
  USERS: "mern_quiz_users_v2", // bumped to v2 for salted SHA-256 schema
  CURRENT_USER: "mern_quiz_current_user_v2",
  QUESTIONS: "mern_quiz_questions",
  ATTEMPTS: "mern_quiz_attempts"
};

// Default seed users with precomputed 16-byte random salt and SHA-256 hashes
// Passwords (Alex: "password123", Samantha: "password123", Marcus: "password123", Sarah: "admin")
const DEFAULT_USERS = [
  {
    id: "stu-1",
    name: "Alex Rivera",
    email: "alex@student.edu",
    salt: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
    passwordHash: "494435d92fd71012bba17c90d86d31e21e8ff123a3bdde2c7c515d5f631518fc",
    role: "student"
  },
  {
    id: "stu-2",
    name: "Samantha Chen",
    email: "samantha@student.edu",
    salt: "1029384756afbecd0192837465feeedc",
    passwordHash: "1a7e25f48d0d0d541d50a66649364c09a8454dea6c9c0bf653b235792bca7f22",
    role: "student"
  },
  {
    id: "stu-3",
    name: "Marcus Johnson",
    email: "marcus@student.edu",
    salt: "f0e1d2c3b4a596871a2b3c4d5e6f7081",
    passwordHash: "65cbfb41a01f53af5e2d3f31e6b8eafb76438d3939ddc0fefb5475b0ca71fe91",
    role: "student"
  },
  {
    id: "teach-1",
    name: "Prof. Sarah Davis",
    email: "sarah@teacher.edu",
    salt: "9876543210fedcba0123456789abcdef",
    passwordHash: "a907accb39cbf1efe1e0f955883413d7be820552c7f25b25f1ade1fb41762e6d",
    role: "teacher"
  }
];

// Sample attempts for immediate dashboard analytics
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

// Initialize storage
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

// ----------------- Auth & Users (SHA-256 + 16-Byte Salt) -----------------

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
    // Strip security sensitive hashes from session storage
    const { passwordHash, salt, ...safeUser } = user;
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(safeUser));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

/**
 * Verify credentials using SHA-256 + Salt
 */
export async function loginUser(email, enteredPassword, role) {
  const users = getUsers();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      (!role || u.role === role)
  );

  if (!found) {
    throw new Error("No account found with this email or role.");
  }

  // Cryptographic verification: SHA256(salt + enteredPassword) === storedHash
  const isValid = await verifyPassword(enteredPassword, found.salt, found.passwordHash);
  if (!isValid) {
    throw new Error("Invalid password. Please check your credentials.");
  }

  setCurrentUser(found);
  return found;
}

/**
 * Register account using random 16-byte salt and SHA-256 hash
 */
export async function registerUser({ name, email, password, role }) {
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const users = getUsers();
  const exists = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  );
  if (exists) {
    throw new Error("An account with this email already exists.");
  }

  // 1. Generate 16-byte cryptographically secure random salt
  const salt = generateSalt();

  // 2. Hash password + salt using SHA-256
  const passwordHash = await hashPassword(password, salt);

  // 3. Store record without plaintext password
  const newUser = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    salt,
    passwordHash,
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
