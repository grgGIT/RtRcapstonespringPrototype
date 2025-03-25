// leaderboardData.js

// Leaderboard Model
const leaderboardData = {
    logs: [
        {
            gameNumber: 1,
            gameDate: new Date('2023-10-05T14:48:00.000Z'),
            users: [
                { name: 'John', score: 3 },
                { name: 'Jane', score: 2 },
                { name: 'Jack', score: 1 },
                { name: 'Jill', score: 0 }
            ],
            winner: { name: 'John', score: 3 }
        },
        {
            gameNumber: 2,
            gameDate: new Date('2023-10-05T14:48:00.000Z'),
            users: [
                { name: 'John', score: 3 },
                { name: 'Jane', score: 2 },
                { name: 'Jack', score: 1 },
                { name: 'Jill', score: 0 }
            ],
            winner: { name: 'John', score: 3 }
        }
    ]
};

module.exports = leaderboardData;