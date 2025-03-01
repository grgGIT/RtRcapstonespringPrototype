// Importing required libraries using require (CommonJS)
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const { SerialPort } = require('serialport');  // Correctly import SerialPort using CommonJS
const { ReadlineParser } = require('@serialport/parser-readline'); // Import parser correctly

// Express setup
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clientPath = path.join(__dirname, '..', 'hosted');
app.use(express.static(clientPath));
app.use(express.json());

const originalsPath = path.join(__dirname, './questions.json');

// Store connected clients
let clients = [];

// Serial port setup
const serialPort = new SerialPort({
  path: 'COM6',  // Replace with your actual serial port path
  baudRate: 115200,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Listen for incoming data on the serial port
parser.on('data', (data) => {
  console.log(`Received from ESP32: ${data}`);
  // Broadcast the data to all WebSocket clients
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Broadcast message to all clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter(client => client !== ws);
  });
});

// Endpoint to get questions
app.get('/getQuestions', (req, res) => {
  const era = req.query.era;
  if (!era) {
    return res.status(400).json({ error: 'No era selected' });
  }

  fs.readFile(originalsPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read questions file' });
    }
    try {
      const allQuestions = JSON.parse(data);
      res.json(allQuestions.era[era] || {});
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse questions data' });
    }
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));

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