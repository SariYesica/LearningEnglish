// Question Bank
const questionBank = [
    {
        question: "What is the subject pronoun for 'Maria'?",
        options: ["She", "Her", "They", "It"],
        answer: "She",
        explanation: "'Maria' is a female name, so the correct subject pronoun is 'She'."
    },
    {
        question: "Which pronoun would replace 'the book' in a sentence?",
        options: ["He", "She", "It", "They"],
        answer: "It",
        explanation: "Objects like 'book' are replaced with 'It'."
    },
    {
        question: "What is the object pronoun for 'John'?",
        options: ["He", "Him", "His", "They"],
        answer: "Him",
        explanation: "The object pronoun for male names is 'Him'."
    },
    {
        question: "Which is a possessive adjective?",
        options: ["Mine", "Yours", "Their", "Hers"],
        answer: "Their",
        explanation: "'Their' is a possessive adjective that modifies a noun (e.g., their house)."
    },
    {
        question: "What is the reflexive pronoun for 'you' (singular)?",
        options: ["Yourself", "Yourselves", "Ourselves", "Myself"],
        answer: "Yourself",
        explanation: "The reflexive form of singular 'you' is 'Yourself'."
    },
    {
        question: "Which sentence uses the correct possessive pronoun?",
        options: [
            "This book is my.",
            "This book is mine.",
            "This book is me.",
            "This book is I."
        ],
        answer: "This book is mine.",
        explanation: "'Mine' is the correct possessive pronoun to show ownership."
    },
    {
        question: "What pronoun would you use for 'Maria and I'?",
        options: ["We", "Us", "They", "Our"],
        answer: "We",
        explanation: "When combining 'I' with another person, the subject pronoun becomes 'We'."
    },
    {
        question: "Which is the correct object pronoun in: 'Please give ____ the book.' (referring to Sarah)?",
        options: ["She", "Her", "Hers", "Herself"],
        answer: "Her",
        explanation: "'Her' is the correct object pronoun in this sentence."
    },
    {
        question: "What is the reflexive pronoun for 'they'?",
        options: ["Themself", "Themselves", "Theirselves", "Theirs"],
        answer: "Themselves",
        explanation: "The correct reflexive pronoun for 'they' is 'themselves'."
    },
    {
        question: "Which is NOT a subject pronoun?",
        options: ["I", "You", "Our", "They"],
        answer: "Our",
        explanation: "'Our' is a possessive adjective, not a subject pronoun."
    }
];

// Quiz Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// DOM Elements
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const quizProgress = document.getElementById('quiz-progress');
const resultSection = document.getElementById('result-section');
const quizSection = document.getElementById('quiz-section');
const introScreen = document.getElementById('intro-screen');
const reviewSection = document.getElementById('review-section');
const startQuizBtn = document.getElementById('start-quiz-btn');
const reviewBtn = document.getElementById('review-btn');
const backToResultsBtn = document.getElementById('back-to-results');
const retakeBtn = document.getElementById('retake-btn');
const scoreDisplay = document.getElementById('score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const scoreMessage = document.getElementById('score-message');
const reviewQuestionsContainer = document.getElementById('review-questions');
const scoreChart = document.getElementById('score-chart');

// Initialize the quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = Array(questionBank.length).fill(null);
    score = 0;
    displayQuestion();
    updateNavigationButtons();
    totalQuestionsDisplay.textContent = questionBank.length;
}

// Display current question with radio buttons next to options
function displayQuestion() {
    const currentQuestion = questionBank[currentQuestionIndex];
    
    let optionsHTML = currentQuestion.options.map((option, index) => {
        const isChecked = userAnswers[currentQuestionIndex] === option;
        return `
            <div class="option-item ${isChecked ? 'selected' : ''}">
                <input type="radio" 
                       name="answer" 
                       id="option-${currentQuestionIndex}-${index}" 
                       value="${option}"
                       ${isChecked ? 'checked' : ''}>
                <label for="option-${currentQuestionIndex}-${index}">${option}</label>
            </div>
        `;
    }).join('');

    questionContainer.innerHTML = `
        <div class="question">
            <h4>Question ${currentQuestionIndex + 1}</h4>
            <p>${currentQuestion.question}</p>
            <div class="options">
                ${optionsHTML}
            </div>
        </div>
    `;

    // Add event listeners to radio buttons and option items
    document.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Update selected state
            document.querySelectorAll('.option-item').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            userAnswers[currentQuestionIndex] = radio.value;
        });
    });

    updateProgress();
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questionBank.length) * 100;
    quizProgress.style.width = `${progress}%`;
}

// Update navigation buttons
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.style.display = currentQuestionIndex < questionBank.length - 1 ? 'block' : 'none';
    submitBtn.style.display = currentQuestionIndex === questionBank.length - 1 ? 'block' : 'none';
}

// Go to next question
function nextQuestion() {
    if (currentQuestionIndex < questionBank.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateNavigationButtons();
    }
}

// Go to previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateNavigationButtons();
    }
}

// Submit quiz
function submitQuiz() {
    // Calculate score
    score = 0;
    for (let i = 0; i < questionBank.length; i++) {
        if (userAnswers[i] === questionBank[i].answer) {
            score++;
        }
    }
    
    // Save results to localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const result = {
        score: score,
        totalQuestions: questionBank.length,
        date: new Date().toLocaleString(),
        answers: userAnswers
    };
    quizResults.push(result);
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    
    // Display results
    displayResults();
}

// Display quiz results
function displayResults() {
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';
    
    scoreDisplay.textContent = score;
    
    // Display score message
    const percentage = (score / questionBank.length) * 100;
    if (percentage >= 80) {
        scoreMessage.textContent = "Excellent! You have a strong understanding of English pronouns.";
    } else if (percentage >= 60) {
        scoreMessage.textContent = "Good job! You have a decent understanding but could use some more practice.";
    } else {
        scoreMessage.textContent = "Keep practicing! Review the material and try again.";
    }
    
    // Create pie chart
    createScoreChart();
}

// Create score chart
function createScoreChart() {
    const ctx = scoreChart.getContext('2d');
    const correct = score;
    const incorrect = questionBank.length - score;
    
    // Destroy previous chart if it exists
    if (scoreChart.chart) {
        scoreChart.chart.destroy();
    }
    
    scoreChart.chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [correct, incorrect],
                backgroundColor: ['#28a745', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Show review of all questions
function showReview() {
    resultSection.style.display = 'none';
    reviewSection.style.display = 'block';
    
    reviewQuestionsContainer.innerHTML = '';
    
    questionBank.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        reviewItem.innerHTML = `
            <h5>Question ${index + 1}: ${question.question}</h5>
            <p>Your answer: <strong>${userAnswer || 'Not answered'}</strong></p>
            <p>Correct answer: <strong>${question.answer}</strong></p>
            <p class="explanation">Explanation: ${question.explanation}</p>
        `;
        
        reviewQuestionsContainer.appendChild(reviewItem);
    });
}

// Back to results from review
function backToResults() {
    reviewSection.style.display = 'none';
    resultSection.style.display = 'block';
}

// Retake quiz
function retakeQuiz() {
    resultSection.style.display = 'none';
    quizSection.style.display = 'block';
    initializeQuiz();
}

// Event Listeners
startQuizBtn.addEventListener('click', function() {
    introScreen.style.display = 'none';
    quizSection.style.display = 'block';
    initializeQuiz();
});

nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
submitBtn.addEventListener('click', submitQuiz);
reviewBtn.addEventListener('click', showReview);
backToResultsBtn.addEventListener('click', backToResults);
retakeBtn.addEventListener('click', retakeQuiz);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Hide quiz and result sections initially
    quizSection.style.display = 'none';
    resultSection.style.display = 'none';
    reviewSection.style.display = 'none';
    
    // Show intro screen
    introScreen.style.display = 'block';
});