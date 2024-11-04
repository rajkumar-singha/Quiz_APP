const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is 3 + 3?", options: ["5", "6", "7", "8"], answer: 1 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is 3 + 3?", options: ["5", "6", "7", "8"], answer: 1 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is 3 + 3?", options: ["5", "6", "7", "8"], answer: 1 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is 3 + 3?", options: ["5", "6", "7", "8"], answer: 1 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is 3 + 3?", options: ["5", "6", "7", "8"], answer: 1 },
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
    const questionElem = document.getElementById("questionText");
    const optionsElem = document.getElementById("options");
    const questionNumberElem = document.getElementById("questionNumber");
    const totalQuestionNumberElem = document.getElementById("totalQuestionNumber");

    questionElem.textContent = questions[currentQuestion].question;
    optionsElem.innerHTML = questions[currentQuestion].options
        .map((option, index) => `
            <button onclick="selectAnswer(${index})" class="option w-full border rounded-lg p-3 text-left">${option}</button>
        `)
        .join("");
    
    questionNumberElem.textContent = currentQuestion + 1;
    totalQuestionNumberElem.textContent = questions.length;
    selectedAnswer = null; // Reset selected answer for new question
    document.getElementById("nextButton").disabled = true; // Disable 'Next' button initially
}

function selectAnswer(index) {
    const correctAnswer = questions[currentQuestion].answer;
    selectedAnswer = index;

    const options = document.querySelectorAll(".option");

    options.forEach((option, idx) => {
        // option.classList.remove("bg-green-500", "bg-red-500"); // Remove any previous feedback colors
        if (idx === correctAnswer) {
            option.classList.add("bg-green-500", "text-white"); // Mark correct answer green
        } else if (idx === index) {
            option.classList.add("bg-red-500", "text-white"); // Mark wrong answer red
        }
    });

    if (selectedAnswer === correctAnswer) {
        score+= 5;
    }

    document.getElementById("score").textContent = score;
    document.getElementById("nextButton").disabled = false; // Enable 'Next' button after selection
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizContainer").classList.add("hidden");
    document.getElementById("resultContainer").classList.remove("hidden");
    document.getElementById("finalScore").textContent = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("quizContainer").classList.remove("hidden");
    document.getElementById("resultContainer").classList.add("hidden");
    loadQuestion();
}

window.onload = loadQuestion;
