// Game configuration
const config = {
    correctAnswer: 'OptB', // Zilby is the correct answer
    timerDuration: 10,
    correctPoints: 10,
    incorrectPoints: -10
};

// Game state
let gameState = {
    timerRunning: false,
    timeRemaining: config.timerDuration,
    answered: false,
    score: 0
};

// DOM Elements
const questionContainer = document.getElementById('question');
const optionsContainer = document.querySelector('.options-container');
const timerElement = document.getElementById('timerValue');
const cashValueElement = document.getElementById('cashValue');
const pointChangeElement = document.getElementById('pointChange');
const hostElement = document.getElementById('Zilby');
const speechBubble = document.querySelector('.speech-bubble');
const hostMessage = document.getElementById('hostMessage');
const optionButtons = document.querySelectorAll('.option-button');

// Initialize the game
function initGame() {
    // Start with the question taking up most of the screen
    setTimeout(() => {
        questionContainer.classList.add('shrink');
        setTimeout(() => {
            optionsContainer.classList.add('show');
            startTimer();
        }, 800);
    }, 2000);

    // Set up event listeners for option buttons
    optionButtons.forEach(button => {
        button.addEventListener('click', () => handleAnswer(button.id));
    });
}

// Timer functionality
function startTimer() {
    gameState.timerRunning = true;
    gameState.timeRemaining = config.timerDuration;
    updateTimerDisplay();

    const timerInterval = setInterval(() => {
        if (gameState.timeRemaining <= 0 || !gameState.timerRunning) {
            clearInterval(timerInterval);
            if (!gameState.answered) {
                timeUp();
            }
            return;
        }

        gameState.timeRemaining--;
        updateTimerDisplay();

        // Add warning class when time is running low
        if (gameState.timeRemaining <= 3) {
            document.getElementById('timer').classList.add('warning');
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = gameState.timeRemaining;
}

function timeUp() {
    gameState.timerRunning = false;
    document.getElementById('timer').classList.remove('warning');
    timerElement.textContent = "Time's up!";
    
    // Disable all buttons
    optionButtons.forEach(button => {
        button.classList.add('disabled');
    });
    
    // Highlight the correct answer
    document.getElementById(config.correctAnswer).classList.add('correct');
    
    // Show host message
    showHostMessage("Yikes. Awkward. The correct answer is Zilby!");
}

// Handle answer selection
function handleAnswer(selectedOptionId) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    gameState.timerRunning = false;
    
    const isCorrect = selectedOptionId === config.correctAnswer;
    
    // Disable all buttons
    optionButtons.forEach(button => {
        button.classList.add('disabled');
    });
    
    // Highlight selected answer
    const selectedButton = document.getElementById(selectedOptionId);
    selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // If wrong, also highlight the correct answer
    if (!isCorrect) {
        document.getElementById(config.correctAnswer).classList.add('correct');
    }
    
    // Update score
    updateScore(isCorrect);
    
    // Show host message
    showHostMessage(isCorrect ? "Yep! You got it!" : "Yikes. Awkward. The correct answer is Zilby!");
}

// Update score display
function updateScore(isCorrect) {
    const pointChange = isCorrect ? config.correctPoints : config.incorrectPoints;
    gameState.score += pointChange;
    
    // Show point change animation
    pointChangeElement.textContent = pointChange > 0 ? `+${pointChange}` : pointChange;
    pointChangeElement.classList.add('show');
    pointChangeElement.classList.add(pointChange > 0 ? 'positive' : 'negative');
    
    setTimeout(() => {
        pointChangeElement.classList.remove('show');
        // Update cash value
        cashValueElement.textContent = `$${gameState.score}`;
        cashValueElement.style.color = gameState.score > 0 ? 'white' : '#f44336';
    }, 1500);
}

// Show host message
function showHostMessage(message) {
    hostMessage.textContent = message;
    speechBubble.classList.remove('hidden');
    
    // Hide message after a delay
    setTimeout(() => {
        speechBubble.classList.add('hidden');
    }, 5000);
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', initGame);