// console.log("Starting")

// document.getElementById('BigRed').addEventListener('click', function() {
//     this.style.display = 'none';
//     const welcomeScreen = document.getElementById('welcomeScreen');
//     welcomeScreen.style.display = 'block';
    
//     // Typewriter effect simulation
//     const texts = document.querySelectorAll('.welcome-text');
//     texts.forEach((text, index) => {
//         text.style.opacity = '0';
//         setTimeout(() => {
//             text.style.opacity = '1';
//             text.style.transition = 'opacity 0.5s ease';
//         }, index * 1000);
//     });
// });

// const GameController = {
//     init() {
//         this.setupEventListeners();
//         this.wheelActive = false;
//         this.setupStyles();
//     },

//     setupStyles() {
//         // Add required styles to document
//         const styles = `
//             .overlay {
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 background: rgba(0, 0, 0, 0.7);
//                 backdrop-filter: blur(5px);
//                 display: none;
//                 justify-content: center;
//                 align-items: center;
//                 z-index: 1000;
//             }

//             .wheel-container {
//                 position: relative;
//                 width: 400px;
//                 height: 400px;
//                 display: none;
//                 justify-content: center;
//                 align-items: center;
//             }

//             .wheel {
//                 width: 300px;
//                 height: 300px;
//                 border-radius: 50%;
//                 position: relative;
//                 border: 10px solid #444;
//                 background: conic-gradient(
//                     from 0deg,
//                     #ff0000 0deg,
//                     #00ff00 120deg,
//                     #0000ff 240deg
//                 );
//                 transition: transform 3s cubic-bezier(0.2, 0.8, 0.2, 1);
//             }

//             .wheel-center {
//                 position: absolute;
//                 top: 50%;
//                 left: 50%;
//                 transform: translate(-50%, -50%);
//                 width: 60px;
//                 height: 60px;
//                 background: #fff;
//                 border-radius: 50%;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//             }

//             .hourglass {
//                 width: 40px;
//                 height: 40px;
//                 animation: spin 1s linear infinite;
//             }

//             .result-text {
//                 position: absolute;
//                 top: 50%;
//                 left: 50%;
//                 transform: translate(-50%, -50%);
//                 color: #fff;
//                 font-size: 24px;
//                 font-weight: bold;
//                 text-align: center;
//                 text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//                 display: none;
//                 z-index: 1001;
//             }

//             @keyframes spin {
//                 from { transform: rotate(0deg); }
//                 to { transform: rotate(360deg); }
//             }
//         `;

//         const styleSheet = document.createElement("style");
//         styleSheet.textContent = styles;
//         document.head.appendChild(styleSheet);
//     },

//     setupEventListeners() {
//         // Listen for difficulty selection
//         const difficultySelect = document.querySelector('.difficulty-select');
//         difficultySelect?.addEventListener('change', () => {
//             this.handleDifficultySelection(difficultySelect.value);
//         });

//         // Setup wheel spin button
//         const timeButton = document.getElementById('TimeButt');
//         timeButton?.addEventListener('click', () => {
//             if (timeButton.classList.contains('active')) {
//                 this.spinWheel();
//             }
//         });
//     },

//     handleDifficultySelection(difficulty) {
//         // Create and show continue button
//         const welcomeScreen = document.getElementById('welcomeScreen');
//         const continueButton = document.createElement('button');
//         continueButton.textContent = 'CONTINUE';
//         continueButton.className = 'welcome-text';
//         continueButton.style.cursor = 'pointer';
//         continueButton.style.border = '2px solid #0ff';
//         continueButton.style.padding = '10px 20px';
//         continueButton.style.marginTop = '20px';
//         continueButton.style.background = 'transparent';
//         continueButton.style.color = '#0ff';

//         continueButton.addEventListener('click', () => {
//             this.transitionToGameMenu(difficulty);
//         });

//         welcomeScreen.querySelector('.welcome-content').appendChild(continueButton);
//     },

//     transitionToGameMenu(difficulty) {
//         // Hide welcome screen
//         document.getElementById('welcomeScreen').style.display = 'none';
        
//         // Load and show player menu
//         fetch('playerMenu.html')
//             .then(response => response.text())
//             .then(html => {
//                 const gameContainer = document.createElement('div');
//                 gameContainer.innerHTML = html;
//                 document.body.appendChild(gameContainer);
                
//                 // Activate Time Spin button
//                 const timeButton = document.getElementById('TimeButt');
//                 timeButton.classList.add('active');
//                 timeButton.style.animation = 'glow 1.5s infinite alternate';
                
//                 // Create overlay for wheel
//                 this.createWheelOverlay();
//             });
//     },

// //     createWheelOverlay() {
// //         const overlay = document.createElement('div');
// //         overlay.className = 'overlay';
        
// //         const wheelContainer = document.createElement('div');
// //         wheelContainer.className = 'wheel-container';
        
// //         const wheel = document.createElement('div');
// //         wheel.className = 'wheel';
        
// //         const wheelCenter = document.createElement('div');
// //         wheelCenter.className = 'wheel-center';
        
// //         const hourglass = document.createElement('img');
// //         hourglass.className = 'hourglass';
// //         hourglass.src = './assets/hourglass.png';
        
// //         const resultText = document.createElement('div');
// //         resultText.className = 'result-text';
        
// //         wheelCenter.appendChild(hourglass);
// //         wheel.appendChild(wheelCenter);
// //         wheelContainer.appendChild(wheel);
// //         wheelContainer.appendChild(resultText);
// //         overlay.appendChild(wheelContainer);
// //         document.body.appendChild(overlay);
// //     },

// //     spinWheel() {
// //         if (this.wheelActive) return;
        
// //         this.wheelActive = true;
// //         const overlay = document.querySelector('.overlay');
// //         const wheelContainer = document.querySelector('.wheel-container');
// //         const wheel = document.querySelector('.wheel');
// //         const resultText = document.querySelector('.result-text');
        
// //         overlay.style.display = 'flex';
// //         wheelContainer.style.display = 'flex';
        
// //         const rotation = 1800 + Math.random() * 360; // 5 full spins + random
// //         wheel.style.transform = `rotate(${rotation}deg)`;
        
// //         setTimeout(() => {
// //             const result = this.determineResult(rotation);
// //             resultText.textContent = result;
// //             resultText.style.display = 'block';
            
// //             setTimeout(() => {
// //                 overlay.style.display = 'none';
// //                 wheelContainer.style.display = 'none';
// //                 resultText.style.display = 'none';
// //                 wheel.style.transform = 'rotate(0deg)';
// //                 this.wheelActive = false;
// //             }, 3000);
// //         }, 3000);
// //     },

// //     determineResult(rotation) {
// //         const normalizedRotation = rotation % 360;
// //         if (normalizedRotation < 120) return "RED WINS!";
// //         if (normalizedRotation < 240) return "GREEN WINS!";
// //         return "BLUE WINS!";
// //     }
// // };

// // Initialize the game controller
// document.addEventListener('DOMContentLoaded', () => {
//     GameController.init();
// });