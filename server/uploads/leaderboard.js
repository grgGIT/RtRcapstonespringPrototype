// leaderboardData.js


// Class for GameLog
class GameLog {
    constructor(gameNumber, gameDate, users, winner) {
        this.gameNumber = gameNumber;
        this.gameDate = gameDate;
        this.users = users;
        this.winner = winner;
    }
}

// Archive Model
const gameArchive = {
    logs: [
        new GameLog(
            1,
            new Date('2023-10-05T14:48:00.000Z'),
            [
                { name: 'John', score: 3 },
                { name: 'Jane', score: 2 },
                { name: 'Jack', score: 1 },
                { name: 'Jill', score: 0 }
            ],
            { name: 'John', score: 3 }
        ),
        // Additional game logs will be added here
    ]
};

// Make leaderboard and rank the highest scores first
// this will often be the winner of each game
const topScores = {

}


// Export the leaderboard data
module.exports = gameArchive;
