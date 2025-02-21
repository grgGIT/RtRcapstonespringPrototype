const GameController = {
    init() {
        this.wheelActive = false;
        this.player = null;
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Big Red Button
        document.getElementById('BigRed').addEventListener('click', () => {
            document.getElementById('BigRed').style.display = 'none';
            document.getElementById('welcomeScreen').style.display = 'block';
            this.resetDifficultySelector();
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
    },

    resetDifficultySelector() {
        this.difficultySelect.value = "";
        this.toggleContinueButton(false);
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