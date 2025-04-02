// leaderboard.js

// Class for GameLog
class GameLog {
    constructor(gameNumber, gameDate, users) {
        this.gameNumber = gameNumber;
        this.gameDate = gameDate;
        this.users = users;
    }

    // Method to calculate the winner dynamically
    getWinner() {
        return this.users.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    }
}

// Archive Model
const gameArchive = {
    logs: [
        new GameLog(
            1,
            new Date('2023-10-05T14:48:00.000Z'),
            [
                // User ID and tracked score

            ]
        ),
        // Additional game logs can be added here
    ],

    // gather top scores from all games and create a leaderboard
    topScores: {
        // Method to get the highest score from each game
        getLeaderboard() {
            // Get the highest score from each game along with the RFID
            const highestScores = gameArchive.logs.map(log => {
                // Find the user with the highest score in this game
                const winner = log.getWinner();
                return {
                    gameNumber: log.gameNumber,
                    gameDate: log.gameDate,
                    RFID: winner.RFID,
                    highestScore: winner.score
                };
            });

            // Sort by highest score in descending order
            highestScores.sort((a, b) => b.highestScore - a.highestScore);

            // Return the top 5 highest scores
            return highestScores.slice(0, 5);
        },
    },
};

// add a new game log
const logNewGame = (gameNumber, gameDate, users) => {
    gameArchive.logs.push(new GameLog(gameNumber, gameDate, users));
};

// Export the gameArchive and logNewGame function
module.exports = { gameArchive, logNewGame };