// Utility to decode HTML entities returned by external APIs
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Fetch Computer Science / Tech Trivia from Open Trivia DB (Free, no API key required)
 * @param {number} amount - Number of questions (default 5)
 * @param {string} difficulty - 'easy' | 'medium' | 'hard' | ''
 * @returns {Promise<Array>} Array of formatted quiz questions
 */
export async function fetchExternalTrivia(amount = 5, difficulty = "") {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}&category=18&type=multiple`;
    if (difficulty && difficulty !== "all") {
      url += `&difficulty=${difficulty}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`External API responded with status ${response.status}`);
    }
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No questions returned from Open Trivia DB.");
    }

    return data.results.map((item, index) => {
      const decodedQuestion = decodeHtml(item.question);
      const decodedCorrect = decodeHtml(item.correct_answer);
      const decodedIncorrect = item.incorrect_answers.map(decodeHtml);

      // Shuffle options and find the correct index
      const options = shuffleArray([decodedCorrect, ...decodedIncorrect]);
      const answerIndex = options.indexOf(decodedCorrect);

      return {
        id: `ext-${Date.now()}-${index}`,
        level: item.difficulty || "medium",
        topic: "CS & Tech (Free API)",
        question: decodedQuestion,
        options,
        answer: answerIndex,
        explanation: `Correct Answer: "${decodedCorrect}". Sourced from Open Trivia Database Free API (Category: Science: Computers).`,
        isExternal: true,
        source: "Open Trivia DB API"
      };
    });
  } catch (error) {
    console.warn("Error fetching external trivia:", error);
    // Provide nice fallback questions if network fails
    return [
      {
        id: `ext-fallback-1`,
        level: "easy",
        topic: "Web Tech (Free API)",
        question: "What does HTTP stand for in web communication?",
        options: [
          "Hypertext Transfer Protocol",
          "High Tech Transmission Path",
          "Hypertext Terminal Processing",
          "Host Transfer Text Protocol"
        ],
        answer: 0,
        explanation: "HTTP stands for Hypertext Transfer Protocol.",
        isExternal: true,
        source: "Fallback Offline Bank"
      },
      {
        id: `ext-fallback-2`,
        level: "medium",
        topic: "Programming (Free API)",
        question: "Which data structure operates on a First-In-First-Out (FIFO) principle?",
        options: ["Stack", "Queue", "Binary Tree", "Heap"],
        answer: 1,
        explanation: "A Queue operates on First-In-First-Out (FIFO).",
        isExternal: true,
        source: "Fallback Offline Bank"
      }
    ];
  }
}

/**
 * Fetch a motivational advice/tech quote from Advice Slip API (Free, no key required)
 */
export async function fetchMotivationalAdvice() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    if (res.ok) {
      const data = await res.json();
      if (data.slip && data.slip.advice) {
        return data.slip.advice;
      }
    }
  } catch (err) {
    console.warn("Advice API error:", err);
  }
  const quotes = [
    "“The only way to learn a new programming language is by writing programs in it.” - Dennis Ritchie",
    "“Simplicity is prerequisite for reliability.” - Edsger W. Dijkstra",
    "“Code is like humor. When you have to explain it, it’s bad.” - Cory House",
    "“First, solve the problem. Then, write the code.” - John Johnson",
    "“Make it work, make it right, make it fast.” - Kent Beck"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}
