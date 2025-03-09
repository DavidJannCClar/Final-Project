let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const submitButton = document.getElementById("submit-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

// Manually define questions and answers
const questions = [
    {
        question: "What is the primary focus of climate action?",
        answers: [
            { text: "Reducing greenhouse gases and adopting sustainable practices", correct: true },
            { text: "Increasing the use of fossil fuels", correct: false },
            { text: "Cutting down more trees", correct: false },
            { text: "Ignoring environmental issues", correct: false }
        ]
    },
    {
        question: "What are some effects of climate change?",
        answers: [
            { text: "Rising sea levels and stronger storms", correct: true },
            { text: "Decreased global temperatures", correct: false },
            { text: "More trees being planted", correct: false },
            { text: "Reduced greenhouse gases", correct: false }
        ]
    },
    {
        question: "What is one solution to fight climate change?",
        answers: [
            { text: "Using cleaner energy sources like wind and solar power", correct: true },
            { text: "Burning more coal and oil", correct: false },
            { text: "Cutting down more trees", correct: false },
            { text: "Ignoring renewable energy", correct: false }
        ]
    },
    {
        question: "How do trees help in the fight against climate change?",
        answers: [
            { text: "They absorb carbon dioxide from the atmosphere", correct: true },
            { text: "They release more greenhouse gases", correct: false },
            { text: "They increase global warming", correct: false },
            { text: "They have no effect on climate change", correct: false }
        ]
    },
    {
        question: "What is one way to reduce emissions?",
        answers: [
            { text: "Using energy-efficient technology", correct: true },
            { text: "Burning more fossil fuels", correct: false },
            { text: "Cutting down forests", correct: false },
            { text: "Increasing industrial waste", correct: false }
        ]
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    // Shuffle the answer choices manually
    const shuffledAnswers = shuffleAnswers(currentQuestion.answers);

    // Display the shuffled answers
    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Manually shuffle answers
function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
}

function resetState() {
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    submitButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    prevButton.style.display = "block";
    if (currentQuestionIndex === questions.length - 1) {
        submitButton.style.display = "block";
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    scoreElement.innerHTML = `${score} / ${questions.length}`;
    resultElement.classList.remove("hidden");
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    submitButton.style.display = "none";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function handlePrevButton() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
        showQuestion();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex >= 0) {
        handlePrevButton();
    }
});

submitButton.addEventListener("click", showScore);

startQuiz();