const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Team = require('./models/Team');
const Player = require('./models/Player');
const { getRandomTeamName, addPlayerToCurrentTeam, getTeamNames } = require('./teamLogic');





router.post('/add-player', async (req, res) => {
    const userID = req.body;
    console.log('Received userID:', userID);

    // assign the player to a team
    try {
        addPlayerToCurrentTeam(userID.toString());
        res.status(200).json({ message: 'Player added to team' });
    } catch (err) {
        console.error('❌ Error adding player:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ Create a new team from player names
router.post('/create-team', async (req, res) => {
    let { playerNames, teamName } = req.body;

    if (!playerNames || !Array.isArray(playerNames) || playerNames.length === 0) {
        return res.status(400).json({ error: 'No player names provided' });
    }

    try {
        const savedPlayers = await Promise.all(
            playerNames.map(name => new Player({ braceletId: name }).save())
        );

        // create a new team with the saved players
        const team = new Team({
            name: teamName || 'Unnamed Team',
            players: savedPlayers.map(p => p._id),
            score: 0
        });

        await team.save();

        res.status(201).json({ message: 'Team created', team });
        return team;
    } catch (err) {
        console.error('❌ Error creating team:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// get a list of names for teams to select from
router.get('/team-names', (req, res) => {
    const firstNames = getTeamNames().map(team => team.firstName);
    const secondNames = getTeamNames().map(team => team.secondName);
    res.json({ firstNames, secondNames });
});

// update team name
router.post('/update-team-name/:id', async (req, res) => {
    const { id } = req.params;
    const { teamName: newName } = req.body;

    try {
        const updatedTeam = await Team.findByIdAndUpdate(
            id,
            { name: newName },
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }

        res.json(updatedTeam);
    } catch (err) {
        console.error('Error updating team name:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// ✅ Submit a final score for a team
router.post('/submit-score/:teamId', async (req, res) => {
  const { teamId } = req.params;
    const { score } = req.body;
    console.log('Received score:', score);
    console.log('Received teamId:', teamId);

    // Validate teamId format
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ error: 'Invalid team ID format' });
    }

    try {
        // Convert score to number to avoid type casting issues
        const numericScore = Number(score);
        
        // Check if score is a valid number
        if (isNaN(numericScore)) {
            return res.status(400).json({ error: 'Score must be a valid number' });
        }

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ error: 'Team not found' });

        team.score = numericScore;
        await team.save();

        res.status(200).json({ message: 'Score updated', team });
    } catch (err) {
        console.error('❌ Error updating score:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// ✅ Get full leaderboard
router.get('/leaderboard/all', async (req, res) => {
    try {
        const teams = await Team.find().sort({ score: -1 }).populate('players');
        res.json(teams);
    } catch (err) {
        console.error('❌ Error fetching leaderboard:', err);
        res.status(500).json({ error: 'Could not fetch leaderboard' });
    }
});

// ✅ Get individual team details
router.get('/leaderboard/:teamId', async (req, res) => {
    const { teamId } = req.params;

    try {
        const team = await Team.findById(teamId).populate('players');
        if (!team) return res.status(404).json({ error: 'Team not found' });

        res.json(team);
    } catch (err) {
        console.error('❌ Error fetching team:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;