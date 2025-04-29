# 🚕 Race to Riches

## Concept

**Race to Riches** is a trivia-based game inspired by the TV show *Cash Cab*. You’ll meet **Zilby**, an intergalactic taxi driver from the planet **Glimmeron**, who accidentally crashes on Earth.  

To help Zilby return home, you’ll need to earn **Cosmic Coins** by answering questions and completing challenges. The faster you earn, the sooner Zilby gets home. Think you can fund his journey?
[Our Process section of the project's Framer website made by Jon Orris for more context](https://racetorichesrit.framer.website/process)

---

## Technical overview

To run this project locally, follow these steps:

1. You will need Node.js, npm packages, and MongoDB installed
2. Proceed to clone this repository
3. All contents including the videos should be int he repository
4. Make sure you have all of the packages installed by running npm install in Terminal 
5. Run MongoDB application
6. Run the program by opening the Terminal and typing npm start
7. If successful, the Terminal will report back with a message stating "running on server port 3000"
8. Copy this into your web browser: localhost:3000
9. Enjoy the game! All you'll need now is a dome to play it in

---
## Installation and Use

- Ensure you have GitKraken or Github Desktop installed
- Ensure you have MongoDB Compass installed
- Ensure you have vsCode or IDE installed
- You will need RFID connection on http://nm-rfid-1.rit.edu:8001/ if possible. Otherwise it likely just will not work


FOR INTENDED VIEWPORT (Intended screen view) 
- Use Firefox 
- Right click browser
- Click inspect
- Go to right hand side of inspect menu and click on the phone shape (Responsive view) 
- Set parameters to 3072 and 1700 in that respective order

IF RUNNING LINUX ON UBUNTU START HERE (Linux Mint is what distro this project used)!!! 
Start by opening a terminal and typing 

```
sudo service mongod start
```
Then open Compass to your localhost database folder and click 'CONNECT'

Clone Repo to your machine using GitKraken, Git command lines, or Github Desktop

```
clone repo
```

## Running

Open the project folder in vsCode or IDE of choice. 

You might see a ton of folders. 

- All of our working final code is located in hosted/finalDirect/

- Assets are in hosted/finalDirect/internalAssets and hosted/finalDirect/audio

- Our starting page is hosted at hosted/finalDirect/homescreen.html

- our server is located in the server folder at server/server.js

- API's are in server folder as well: our questions are populated by server/finalQuestions.json; team names are in server/teamNamesAPI.json

- Middleware and communication between RFID scanner and mongoDB team creation are in server/src/ and server/src/models


TO RUN THE PROJECT

FIRST

go to hosted/finalDirect/playerJoincopy.html

then go to line 546 and delete the 'hidden' property on the button 'bt'

THEN

open a command terminal

```
npm i
```

then 
```
npm start
```

then go to localhost:3000/finalDirect/homescreen.html

You might have some issues if you don't have RFID hooked up. To return full computer use and not Arduino inclusion, you will need to likely fix the error lines on the localhost:3000/finalDirect/playerJoincopy.html page. But if it is broken, you can skip around the html pages within finalDirect


