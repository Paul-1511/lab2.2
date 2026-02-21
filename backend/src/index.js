const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// simulation route for bounded buffer visualization project
const { runSimulation } = require('./buffer');

app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

app.get('/simulate', async (req, res) => {
  try {
    const output = await runSimulation(60000); // run for 60 seconds
    res.set('Content-Type', 'text/plain');
    res.send(output);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Additional routes can be added here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
