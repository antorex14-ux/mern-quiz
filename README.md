# 🚀 MERN Stack QuizHub - Dual Portal Application

A full-featured Quiz Web Application for mastering the MERN Stack (MongoDB, Express.js, React, Node.js, REST API, HTTP, and Mongoose). Built with React, Vite, and Tailwind CSS.

## 🌟 Key Features

### 1. Dual Logins & Role Management
- **Student Portal**:
  - Attempt quizzes customized by difficulty (`Easy [40]`, `Medium [40]`, `Hard [40]`, or `All [120]`) and topic.
  - Choose timed mode (1 min/question with live countdown) or practice untimed mode.
  - Question matrix palette, flagging questions for review, and instant grading.
  - Scorecard with percentage, topic mastery breakdown, and complete question-by-question review with explanations.
  - Student attempt history and teacher evaluation remarks viewer.
- **Teacher Portal**:
  - Class KPI metrics: Total attempts, Class Average (%), Pass Rate (≥60%), Active Questions.
  - Searchable student submissions table with direct access to each student's complete answer sheet.
  - **Evaluation Feedback System**: Teachers can review any student's answer sheet and submit personalized feedback remarks that appear on the student's dashboard.
  - **CSV Export**: 1-click export of student test scores and records.

### 2. Free API Integrations
- **Open Trivia Database (OpenTDB) API**:
  - Direct integration with Open Trivia DB's Science: Computers category (`https://opentdb.com/api.php?category=18&type=multiple`).
  - Teachers can fetch 5–15 live external tech questions into the active quiz pool with 1 click. Completely free, no API key required.
- **Advice Slip Free API**:
  - Displays dynamic motivational programming advice upon completing each quiz (`https://api.adviceslip.com/advice`).
- **Built-in Free REST API Explorer**:
  - Interactive API console simulating `GET /api/questions`, `GET /api/scores`, and `GET /api/stats` with formatted JSON inspection and 1-click copy.

### 3. All 120 Curated MERN Questions Included
- **Easy (Questions 1–40)**: MERN stack definitions, Node `npm init`, Express route basics (`app.get`, `app.post`), React components & JSX, MongoDB collections & basic CRUD.
- **Medium (Questions 41–80)**: Data flows, Express middleware, `req.params`, `req.query`, REST HTTP codes (201, 401, 403), MongoDB operators (`$set`, `$inc`), Mongoose models & schemas, React hooks (`useState`, `useEffect`).
- **Hard (Questions 81–120)**: MERN architecture, Express 4-argument error-handling middleware (`err, req, res, next`), REST design, MongoDB atomic operations, Mongoose validation, async/await event-driven Node.js, and client/server separation.

---

## ⚡ Quick Demo Accounts

You can log in instantly with 1-click on the login screen or use these credentials:

| Role | Name | Email | Password |
|---|---|---|---|
| **Student** | Alex Rivera | `alex@student.edu` | `password123` |
| **Teacher** | Prof. Sarah Davis | `sarah@teacher.edu` | `admin` |

*(You can also use the top floating bar to instantly switch between Student and Teacher modes.)*

---

## 🏃 Running the Application

In the project directory (`C:\Users\Antony\.gemini\antigravity\scratch\mern-quiz-app`):

```bash
# Start Vite development server
npm run dev
```

To build for production:
```bash
npm run build
```
