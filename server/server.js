// Importing required libraries using require (CommonJS)
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const os = require('os');
const { SerialPort } = require('serialport');  // Correctly import SerialPort using CommonJS
const { ReadlineParser } = require('@serialport/parser-readline'); // Import parser correctly

// Express setup
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// send hosted assets
const clientPath = path.join(__dirname, '..', 'hosted');
app.use(express.static(clientPath));
app.use(express.json());


// New endpoint to receive button press POST requests from ESP32
app.post('/button', (req, res) => {
  const { message } = req.body;
  console.log(`Received button press over WiFi: ${message}`);

  // Send this message to all connected WebSocket clients (your game)
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

  res.json({ status: 'Button press received' });
});


// Path to the questions file
const originalsPath = path.join(__dirname, './finalQuestions.json');

// Store connected clients
let clients = [];

// Serial port setup

async function initializeSerialPort() {
  try {
    // List all available ports
    const ports = await SerialPort.list();
    console.log('Available ports:');
    ports.forEach(port => console.log(port.path));
    
    let selectedPort = null;
    
    if (os.platform() === 'win32') {
      // On Windows, look for COM6
      selectedPort = ports.find(port => port.path === 'COM6');
    } else {
      // On Linux, look for common patterns for Arduino/ESP32 devices
      selectedPort = ports.find(port => 
        port.path.startsWith('/dev/ttyUSB') || 
        port.path.startsWith('/dev/ttyACM') ||
        port.path.startsWith('/dev/ttyS')
      );
    }
    
    if (!selectedPort) {
      console.error('No suitable serial port found');
      return;
    }
    
    console.log(`Connecting to port: ${selectedPort.path}`);
    
    const serialPort = new SerialPort({
      path: selectedPort.path,
      baudRate: 115200,
    });
    
    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
    
    serialPort.on('open', () => {
      console.log(`Serial port ${selectedPort.path} opened successfully`);
    });
    
    serialPort.on('error', (err) => {
      console.error('Serial port error:', err.message);
    });
    
    parser.on('data', (data) => {
      console.log(`Received from ESP32: ${data}`);
      // Broadcast the data to all WebSocket clients
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
    
    return serialPort;
  } catch (error) {
    console.error('Error initializing serial port:', error);
  }
}
initializeSerialPort();

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
    // ensure that an era is selected
    return res.status(400).json({ error: 'No era selected' });
  }

  // Read the questions file
  fs.readFile(originalsPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read questions file' });
    }
    try {
      // Parse the JSON data and send the questions for the selected era
      const allQuestions = JSON.parse(data);
      console.log(allQuestions.era[era]);
      res.json(allQuestions.era[era] || {});
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse questions data' });
    }
  });
});


/// ENDPOINT TO GET RFID DATA
app.post('/RFIDscanner', (req, res) => {
  // GRAB THE RFID DATA FROM THE PROVIDED API
  const id = req.body.id;
  console.log(req.body);

  // put the ids in an team array
  const teamArray = [];
  teamArray.push(id);

  // Player has scanned in at this point
  // Run this at the start of the game
  // Game should be kicked off here

  console.log(`RFID Scanned: ${id}, Team: 1:${teamArray}`);
  res.status(200).json({ message: 'RFID scanned successfully' });
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