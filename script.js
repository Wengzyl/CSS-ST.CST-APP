const questions = [
    {
        question: "What is the input device that controls a cursor in a display?",
        image: "mouse1.jpg",
        wrongImage: "mouse2.jpg",
        answers: [
            { text: "Mouse", correct: true },
            { text: "Mousepad", correct: false },
            { text: "Keyboard", correct: false },
            { text: "Monitor", correct: false },
        ]
    },
    {
        question: "Which output device generates sound?",
        image: "images/speaker.jpg",
        wrongImage: "images/wrong.jpg",
        answers: [
            { text: "Speaker", correct: true },
            { text: "Microphone", correct: false },
            { text: "Graphics Card", correct: false },
            { text: "Motherboard", correct: false },
        ]
    },
    {
        question: "Which device allows a computer to run briefly after power loss?",
        image: "images/ups.jpg",
        wrongImage: "images/wrong.jpg",
        answers: [
            { text: "UPS", correct: true },
            { text: "CPU", correct: false },
            { text: "HDD/SSD", correct: false },
            { text: "Power Supply", correct: false },
        ]
    },
    {
        question: "Which component is considered the brain of the computer?",
        image: "images/cpu.jpg",
        wrongImage: "images/wrong.jpg",
        answers: [
            { text: "Hard Drive", correct: false },
            { text: "RAM", correct: false },
            { text: "CPU", correct: true },
            { text: "Graphics Card", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const introMusic = new Audio("intro.mp3");
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    introMusic.play();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    nextButton.style.display = "none";
    questionImage.style.display = "none";
    showQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    const introVideo = document.getElementById("intro-video");
    introVideo.muted = true;
});

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    questionImage.src = "";
    questionImage.style.display = "none";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    questionImage.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    let currentQuestion = questions[currentQuestionIndex];
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        correctSound.play();
        score++;
        questionImage.src = currentQuestion.image;
    } else {
        selectedBtn.classList.add("incorrect");
        wrongSound.play();
        questionImage.src = currentQuestion.wrongImage;
    }
    questionImage.style.display = "block";

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    
    if (score === questions.length) {
        questionImage.src = "images/perfect.jpg";
    } else if (score > questions.length / 2) {
        questionImage.src = "images/good.jpg";
    } else {
        questionImage.src = "sad1.jpg";
    }
    
    questionImage.style.display = "block";
    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
