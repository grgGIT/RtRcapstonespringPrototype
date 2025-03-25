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
                { name: 'John', score: 3 },
                { name: 'Jane', score: 2 },
                { name: 'Jack', score: 1 },
                { name: 'Jill', score: 0 }
            ]
        ),
        // Additional game logs can be added here
    ],

    // Make leaderboard and rank the highest scores first
    topScores: {
        // Rank all users across all games
        getTopScores: () => {
            const allUsers = gameArchive.logs.flatMap(log => log.users);
            const uniqueUsers = [...new Map(allUsers.map(user => [user.name, user])).values()];
            uniqueUsers.forEach(user => {
                user.totalScore = allUsers.filter(u => u.name === user.name).reduce((acc, u) => acc + u.score, 0);
            });
            return uniqueUsers.sort((a, b) => b.totalScore - a.totalScore);
        },
    }
};

// Export the leaderboard data
module.exports = gameArchive;