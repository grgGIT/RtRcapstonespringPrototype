const GameController = {
    init() {
        this.wheelActive = false;
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Big Red Button
        document.getElementById('BigRed').addEventListener('click', () => {
            document.getElementById('BigRed').style.display = 'none';
            document.getElementById('welcomeScreen').style.display = 'block';
            this.animateWelcomeText();

            // Create a new player object
            this.createPlayer();
        });

        // Difficulty Selection
        const difficultySelect = document.querySelector('.difficulty-select');
        difficultySelect.addEventListener('change', () => {
            if (difficultySelect.value) {
                this.showContinueButton();
            }
        });

        // Spin Button
        document.querySelector('.spin-button').addEventListener('click', () => {
            if (!this.wheelActive) {
                this.spinWheel();

                // update player lastUpdated time
                this.Player.playerData.lastUpdated = new Date().toISOString();
            }
        });
    },

    animateWelcomeText() {
        const texts = document.querySelectorAll('.welcome-text');
        texts.forEach((text, index) => {
            text.style.opacity = '0';
            setTimeout(() => {
                text.style.opacity = '1';
                text.style.transition = 'opacity 0.5s ease';
            }, index * 1000);
        });
    },

    showContinueButton() {
        const continueButton = document.createElement('button');
        continueButton.textContent = 'CONTINUE';
        continueButton.className = 'welcome-text';
        continueButton.style.cursor = 'pointer';
        continueButton.style.border = '2px solid #0ff';
        continueButton.style.padding = '10px 20px';
        continueButton.style.marginTop = '20px';
        continueButton.style.background = 'transparent';
        continueButton.style.color = '#0ff';

        continueButton.addEventListener('click', () => {
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'flex';

            // update player difficulty in the player object
            const difficultySelect = document.querySelector('.difficulty-select').value;
            this.Player.playerData.difficulty = difficultySelect;
            console.log("Selected Difficulty: ", this.Player.playerData.difficulty);
        });

        const welcomeContent = document.querySelector('.welcome-content');
        if (!welcomeContent.querySelector('button')) {
            welcomeContent.appendChild(continueButton);
        }
    },

    spinWheel() {
        this.wheelActive = true;
        const wheel = document.querySelector('.wheel');
        const resultText = document.querySelector('.result-text');
        const spinButton = document.querySelector('.spin-button');
        const scoreLabel = document.querySelector('.score-label');

        spinButton.disabled = true;
        const rotation = 1800 + Math.random() * 360;
        wheel.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            const result = this.determineResult(rotation);
            resultText.textContent = result;
            resultText.style.display = 'block';

            // update player score if Blue wins
            if (result === "BLUE WINS!") {
                this.Player.playerData.score += 10;
                scoreLabel.textContent = `Score: ${this.Player.playerData.score}`;
            }

            setTimeout(() => {
                resultText.style.display = 'none';
                this.wheelActive = false;
                spinButton.disabled = false;
            }, 3000);
        }, 3000);
    },

    determineResult(rotation) {
        const normalizedRotation = rotation % 360;
        if (normalizedRotation < 120) return "RED WINS!";
        if (normalizedRotation < 240) return "GREEN WINS!";
        return "BLUE WINS!";
    },

    // create a new player object when the game starts
    createPlayer() {
        this.Player = {
            // assign a random RFID to the player (for now)
            userRFID: Math.floor(Math.random() * 1000000),
            playerData: {
                name: 'FluffyPanda' + Math.floor(Math.random(0, 100)),
                score: 0,
                difficulty: '',
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
            },
        };

        // log it
        console.log("New Player created: ", this.Player);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    GameController.init();
});