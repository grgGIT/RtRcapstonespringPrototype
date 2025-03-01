const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const clientPath = path.join(__dirname, '..', 'hosted');
app.use(express.static(clientPath));
app.use(express.json());

//list of questions json
const originalsPath = path.join(__dirname, './questions.json');

///
//Our code for this project goes here
//////



// this will equal the era object
let selectedEra = '';

// Endpoint to set the selected era
app.post('/setSelectedEra', (req, res) => {
    selectedEra = req.body.era;
    console.log(`Selected Era: ${selectedEra}`);
    res.json({ message: 'Era selection saved successfully' });
});

//get question file by era selected
app.get('/getQuestions', (req, res) => {
    // If the era is passed as a query parameter, use that instead
    const era = req.query.era || selectedEra;
    
    if (!era) {
        return res.status(400).json({ error: 'No era selected' });
    }

    fs.readFile(originalsPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read questions file' });
        }

        try {
            const allQuestions = JSON.parse(data);
            
            // Check if the selected era exists in the questions
            if (!allQuestions.era[era]) {
                return res.status(404).json({ error: `Questions for era "${era}" not found` });
            }
            
            // Return the questions for the selected era
            res.json(allQuestions.era[era]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to parse questions data' });
        }
    });
});




/////
//Example code beyond this point (from Geoff in capstone 1)
///////////



// const originalsPath = path.join(__dirname, 'posters.json');
// const editedPath = path.join(__dirname, 'uploads', 'edited.json');

// let selectedPosterId = 1;

// // Ensure the data file exists
// if (!fs.existsSync(originalsPath)) {
//     fs.writeFileSync(originalsPath, JSON.stringify([]));
// }

// // data file check for the edited.json
// if (!fs.existsSync(editedPath)) {
//     fs.writeFileSync(editedPath, JSON.stringify([]));
// }


// // Endpoint to retrieve posters
// app.get('/getPosters', (req, res) => {
//     fs.readFile(originalsPath, (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read data file' });
//         }
//         res.json(JSON.parse(data));
//     });
// });

// app.get('/getSavedPosters', (req, res) => {
//     fs.readFile(editedPath, (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read data file' });
//         }
//         res.json(JSON.parse(data));
//     });
// });

// app.get('/getSelectedPosterNumber', (req, res) => {

//     // res.json({id: 1, svg: 'assets/geoff-nuclear-svg.svg'});
//     // res.json({id: 2, svg: 'assets/geoff-ball-svg.svg'});

//     if (selectedPosterId === 7) {
//         res.json({id: 7, svg: 'assets/geoff-nuclear-svg.svg'});
//     }
//     else {
//         res.json({id: 5, svg: 'assets/geoff-ball-svg.svg'});
//     }
// });

// app.post('/selectPoster', (req, res) => {
//     console.log('Youre in the post request!');
//     selectedPosterId = req.body.id;
//     console.log(`Selected Poster ID Is ${selectedPosterId}`);
//     res.json({ message: 'Poster selection submitted successfully' });
// });

// app.post( '/savePoster', (req, res) => {
//     const newPosterData = req.body;

//     fs.readFile(editedPath, (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read data file' });
//         }

//         const posters = JSON.parse(data);
//         posters.push(newPosterData);

//         fs.writeFile(editedPath, JSON.stringify(posters, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to save data' });
//             }
//             res.json({ message: 'Poster saved successfully' });
//         });
//     });
// });

///////////////
///////////////////////////////
//Server starting stuff beyond this point (don't change)
///////////////////////////////
//////////////

// Define a route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join( __dirname, '../hosted/index.html'));
});
app.listen(port, () => console.log(`Server running on port ${port}`));