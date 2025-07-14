const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language"],
    correct: 0
  },
  {
    question: "Which CSS property changes text color?",
    answers: ["text-color", "font-color", "color"],
    correct: 2
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    answers: ["v", "var", "value"],
    correct: 1
  },
  {
    question: "Which tag is used to create a link in HTML?",
    answers: ["<a>", "<link>", "<href>"],
    correct: 0
  },
  {
    question: "What symbol is used for comments in JavaScript?",
    answers: ["<!-- comment -->", "// comment", "** comment **"],
    correct: 1
  },
  {
    question: "Which layout system is used in CSS for 1D layout?",
    answers: ["Grid", "Flexbox", "Float"],
    correct: 1
  },
  {
    question: "How do you select an element with ID 'header' in CSS?",
    answers: ["#header", ".header", "header"],
    correct: 0
  },
  {
    question: "Which function logs output to console?",
    answers: ["log()", "console.log()", "print()"],
    correct: 1
  },
  {
    question: "Which input type is used for email in HTML?",
    answers: ["type='mail'", "type='email'", "type='text-email'"],
    correct: 1
  },
  {
    question: "Which CSS unit is relative to font size?",
    answers: ["px", "em", "%"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    questionEl.textContent = `🎉 Quiz Completed! You scored ${score} / ${questions.length}`;
    answersEl.innerHTML = "";
    nextBtn.textContent = "Restart Quiz";
    nextBtn.style.display = "block";
    nextBtn.onclick = restartQuiz;
    return;
  }

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i, btn);
    answersEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex, btn) {
  const correctIndex = questions[currentQuestion].correct;
  const allButtons = document.querySelectorAll("#answers button");

  allButtons.forEach((button, i) => {
    button.disabled = true;
    if (i === correctIndex) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
  }

  currentQuestion++;
  nextBtn.style.display = "block";
  nextBtn.onclick = loadQuestion;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";
  nextBtn.textContent = "Next";
  loadQuestion();
}

loadQuestion();

// Joke Generator
async function getJoke() {
  const jokeEl = document.getElementById("joke");
  jokeEl.textContent = "Loading...";
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    const data = await res.json();
    jokeEl.textContent = data.joke;
  } catch (err) {
    jokeEl.textContent = "Sorry! Couldn't fetch a joke. 😢";
  }
}
