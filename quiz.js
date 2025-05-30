// quiz.js

// 25 soal pronoun dengan pilihan dan kunci jawaban + pembahasan
const allQuestions = [
    {
        question: "Choose the correct subject pronoun: (Dia pria) ___ is going to school.",
        options: ["His", "Him", "He", "Her"],
        answer: 2,
        explanation: "‘He’ is the subject pronoun used for a male subject."
    },
    {
        question: "Choose the correct object pronoun: I saw (dia pria) ___ at the park.",
        options: ["he", "her", "his", "him"],
        answer: 3,
        explanation: "‘Him’ is the object pronoun used as the object of the verb 'saw'."
    },
    {
        question: "Choose the correct possessive adjective: That is (dia pria) ___ book.",
        options: ["he", "him", "his", "her"],
        answer: 2,
        explanation: "‘His’ is a possessive adjective indicating ownership."
    },
    {
        question: "Choose the correct subject pronoun: ___ are my friends.",
        options: ["They", "Them", "Their", "Theirs"],
        answer: 0,
        explanation: "‘They’ is the subject pronoun used for plural subjects."
    },
    {
        question: "Choose the correct object pronoun: Can you help ___?",
        options: ["they", "their", "them", "theirs"],
        answer: 2,
        explanation: "‘Them’ is the object pronoun used as the object of the verb 'help'."
    },
    {
        question: "Choose the correct possessive pronoun: This book is ___.",
        options: ["their", "they", "them", "theirs"],
        answer: 3,
        explanation: "‘Theirs’ is a possessive pronoun showing ownership."
    },
    {
        question: "Choose the correct reflexive pronoun: She made it by (dia wanita) ___.",
        options: ["herself", "himself", "themselves", "yourself"],
        answer: 0,
        explanation: "‘Herself’ is the reflexive pronoun for ‘she’."
    },
    {
        question: "Choose the correct subject pronoun: ___ am reading a book.",
        options: ["Me", "I", "My", "Mine"],
        answer: 1,
        explanation: "‘I’ is the subject pronoun."
    },
    {
        question: "Choose the correct object pronoun: Please give it to ___.",
        options: ["I", "me", "my", "mine"],
        answer: 1,
        explanation: "‘Me’ is the object pronoun."
    },
    {
        question: "Choose the correct possessive adjective: That is ___ house.",
        options: ["we", "us", "our", "ours"],
        answer: 2,
        explanation: "‘Our’ is the possessive adjective."
    },
    {
        question: "Choose the correct subject pronoun: (Dia pria) ___ loves to play soccer.",
        options: ["He", "Him", "His", "Her"],
        answer: 0,
        explanation: "‘He’ is the subject pronoun."
    },
    {
        question: "Choose the correct object pronoun: I will call (dia wanita) ___ later.",
        options: ["she", "they", "hers", "her"],
        answer: 3,
        explanation: "‘Her’ is the object pronoun."
    },
    {
        question: "Choose the correct possessive pronoun: The car is ___ (dia wanita).",
        options: ["his", "him", "he", "hers"],
        answer: 3,
        explanation: "‘Hers’ is the possessive pronoun."
    },
    {
        question: "Choose the correct reflexive pronoun: We did it by ___.",
        options: ["ourselves", "yourself", "himself", "herself"],
        answer: 0,
        explanation: "‘Ourselves’ is the reflexive pronoun for ‘we’."
    },
    {
        question: "Choose the correct subject pronoun: ___ are going to the market.",
        options: ["They", "Them", "Their", "Theirs"],
        answer: 0,
        explanation: "‘They’ is the subject pronoun."
    },
    {
        question: "Choose the correct object pronoun: I spoke to ___.",
        options: ["they", "them", "their", "theirs"],
        answer: 1,
        explanation: "‘Them’ is the object pronoun."
    },
    {
        question: "Choose the correct possessive adjective: Is this ___ pen?",
        options: ["you", "your", "yours", "yourself"],
        answer: 1,
        explanation: "‘Your’ is the possessive adjective."
    },
    {
        question: "Choose the correct reflexive pronoun: You should do it by ___.",
        options: ["myself", "yourself", "himself", "themselves"],
        answer: 1,
        explanation: "‘Yourself’ is the reflexive pronoun for ‘you’."
    },
    {
        question: "Choose the correct subject pronoun: ___ like ice cream.",
        options: ["Mine", "Me", "I", "My"],
        answer: 2,
        explanation: "‘I’ is the subject pronoun."
    },
    {
        question: "Choose the correct object pronoun: Give the book to ___ (dia pria).",
        options: ["he", "his", "him", "her"],
        answer: 2,
        explanation: "‘Him’ is the object pronoun."
    },
    {
        question: "Choose the correct possessive pronoun: The house is ___.",
        options: ["ours", "our", "us", "we"],
        answer: 0,
        explanation: "‘Ours’ is the possessive pronoun."
    },
    {
        question: "Choose the correct reflexive pronoun: They prepared themselves for the test.",
        options: ["yourself", "himself", "herself", "themselves"],
        answer: 3,
        explanation: "‘Themselves’ refers back to ‘they’."
    },
    {
        question: "Choose the correct subject pronoun: ___ am very happy.",
        options: ["Mine", "Me", "My", "I"],
        answer: 3,
        explanation: "‘I’ is the subject pronoun."
    },
    {
        question: "Choose the correct object pronoun: The teacher gave ___ a prize.",
        options: ["we", "us", "our", "ours"],
        answer: 1,
        explanation: "‘Us’ is the object pronoun."
    },
    {
        question: "Choose the correct possessive adjective: This is ___ book.",
        options: ["his", "him", "he", "her"],
        answer: 0,
        explanation: "‘His’ is the possessive adjective."
    }
];

// State variables
let currentQuestionIndex = 0;
let selectedAnswers = [];
let quizQuestions = [];

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizSection = document.getElementById('quiz-section');
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultSection = document.getElementById('result-section');
const reviewSection = document.getElementById('review-section');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const scoreMessage = document.getElementById('score-message');
const reviewBtn = document.getElementById('review-btn');
const retakeBtn = document.getElementById('retake-btn');
const backToResultsBtn = document.getElementById('back-to-results');
const reviewQuestionsContainer = document.getElementById('review-questions');
const quizProgressBar = document.getElementById('quiz-progress');
const scoreChartCtx = document.getElementById('score-chart').getContext('2d');

let scoreChart;

// Function to shuffle and pick 10 random questions
function pickRandomQuestions() {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

// Render current question and options
function renderQuestion() {
    const q = quizQuestions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">
            <h5>Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</h5>
            <p>${q.question}</p>
            <div class="options">
                ${q.options.map((opt, idx) => `
                    <label class="option-item ${selectedAnswers[currentQuestionIndex] === idx ? 'selected' : ''}">
                        <input type="radio" name="option" value="${idx}" ${selectedAnswers[currentQuestionIndex] === idx ? 'checked' : ''}>
                        ${opt}
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    // Update buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'inline-block' : 'none';

    // Update progress bar
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    quizProgressBar.style.width = `${progressPercent}%`;

    // Add event listener to options
    const optionInputs = questionContainer.querySelectorAll('input[name="option"]');
    optionInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            selectedAnswers[currentQuestionIndex] = parseInt(e.target.value);
            renderQuestion(); // Re-render to update selected class
        });
    });
}

// Calculate score
function calculateScore() {
    let score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        if (selectedAnswers[i] === quizQuestions[i].answer) {
            score++;
        }
    }
    return score;
}

// Show result section
function showResults() {
    introScreen.style.display = 'none';
    quizSection.style.display = 'none';
    reviewSection.style.display = 'none';
    resultSection.style.display = 'block';

    const score = calculateScore();
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = quizQuestions.length;

    // simpan ke local storage
    const quizResult = {
        date: new Date().toISOString(),
        score: score,
        totalQuestions: quizQuestions.length
    };

    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    quizResults.push(quizResult);
    localStorage.setItem('quizResults', JSON.stringify(quizResults));

    // Show score message
    let message = '';
    const percent = (score / quizQuestions.length) * 100;
    if (percent === 100) {
        message = 'Perfect! Excellent job!';
    } else if (percent >= 70) {
        message = 'Good job! Keep practicing to improve even more.';
    } else if (percent >= 40) {
        message = 'Not bad, but you can do better.';
    } else {
        message = 'Keep studying and try again!';
    }
    scoreMessage.textContent = message;

    // Draw chart
    if (scoreChart) {
        scoreChart.destroy();
    }
    scoreChart = new Chart(scoreChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                label: 'Quiz Results',
                data: [score, quizQuestions.length - score],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
            }
        }
    });
}

// Show review section
function showReview() {
    introScreen.style.display = 'none';
    quizSection.style.display = 'none';
    resultSection.style.display = 'none';
    reviewSection.style.display = 'block';

    reviewQuestionsContainer.innerHTML = quizQuestions.map((q, idx) => {
        const userAnswer = selectedAnswers[idx];
        const isCorrect = userAnswer === q.answer;
        return `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <h5>Question ${idx + 1}:</h5>
                <p>${q.question}</p>
                <p><strong>Your answer:</strong> ${userAnswer !== undefined ? q.options[userAnswer] : 'No answer selected'}</p>
                <p><strong>Correct answer:</strong> ${q.options[q.answer]}</p>
                <p><em>${q.explanation}</em></p>
            </div>
        `;
    }).join('');
}

// Event listeners
startQuizBtn.addEventListener('click', () => {
    // Initialize quiz state
    quizQuestions = pickRandomQuestions();
    selectedAnswers = Array(quizQuestions.length).fill(undefined);
    currentQuestionIndex = 0;

    introScreen.style.display = 'none';
    quizSection.style.display = 'block';
    resultSection.style.display = 'none';
    reviewSection.style.display = 'none';

    renderQuestion();
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    // Optional: check if all questions are answered
    if (selectedAnswers.some(ans => ans === undefined)) {
        if (!confirm('You have unanswered questions. Submit anyway?')) {
            return;
        }
    }
    showResults();
});

reviewBtn.addEventListener('click', () => {
    showReview();
});

retakeBtn.addEventListener('click', () => {
    introScreen.style.display = 'block';
    quizSection.style.display = 'none';
    resultSection.style.display = 'none';
    reviewSection.style.display = 'none';
});

backToResultsBtn.addEventListener('click', () => {
    reviewSection.style.display = 'none';
    resultSection.style.display = 'block';
});
