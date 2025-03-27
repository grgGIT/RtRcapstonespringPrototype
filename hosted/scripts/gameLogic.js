class GameEngine {
    constructor() {
        this.questions = [];
        this.currentQuestion = null;
        this.timerDuration = 15;
        this.timeLeft = this.timerDuration;
        this.timerInterval = null;
    }

    async initialize() {
        try {
            const response = await fetch('questions.json');
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            const playState = JSON.parse(localStorage.getItem('playState'));
            
            this.questions = data[playState.selectedEra]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            
            this.loadQuestion();
            this.startTimer();
        } catch (error) {
            console.error('Error initializing game:', error);
            // Handle error, e.g., show an error message to the user
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.handleTimeout();
            }
        }, 1000);
    }

    loadQuestion() {
        this.currentQuestion = this.questions.shift();
        if (!this.currentQuestion) return this.endGame();
        
        document.getElementById('question-text').textContent = this.currentQuestion.question;
        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = this.currentQuestion.answers
            .map(a => `<button class="answer-btn">${a.text}</button>`)
            .join('');
    }

    handleAnswer(selectedBtn, selectedAnswer) {
        clearInterval(this.timerInterval);
        const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
        
        // Visual feedback
        selectedBtn.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        // Update score if correct
        if (isCorrect) {
            const playState = JSON.parse(localStorage.getItem('playState'));
            playState.score += this.currentQuestion.value;
            localStorage.setItem('playState', JSON.stringify(playState));
        }

        // Show feedback and proceed after delay
        this.showFeedback(isCorrect);
        setTimeout(() => {
            selectedBtn.classList.remove('correct', 'incorrect');
            this.loadQuestion();
        }, 1500);
    }

    showFeedback(isCorrect) {
        const feedback = document.createElement('div');
        feedback.style.position = 'fixed';
        feedback.style.top = '50%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.color = isCorrect ? '#0f0' : '#f00';
        feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1500);
    }

    async endGame() {
        const playState = JSON.parse(localStorage.getItem('playState'));
        try {
            const response = await fetch('PlayerDataAPI.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: crypto.randomUUID(),
                    score: playState.score,
                    era: playState.selectedEra
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit score');
            }
            
            window.location.href = '/results.html';
        } catch (error) {
            console.error('Error submitting score:', error);
            // Handle error, e.g., show an error message to the user
        }
    }

    handleTimeout() {
        // Handle the case when time runs out
        this.showFeedback(false);
        setTimeout(() => this.loadQuestion(), 1500);
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new GameEngine();
    
    // Event delegation for answers
    document.getElementById('answers').addEventListener('click', (e) => {
        if (e.target.classList.contains('answer-btn')) {
            const selectedAnswer = e.target.textContent;
            game.handleAnswer(e.target, selectedAnswer);
        }
    });

    game.initialize();
});