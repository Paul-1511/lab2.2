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
    // allow customization via query string, e.g. /simulate?producers=6&consumers=6&duration=6000
    const { producers, consumers, duration, capacity } = req.query;
    const simOptions = {
      durationMs: duration ? parseInt(duration, 10) : undefined,
      producersCount: producers ? parseInt(producers, 10) : undefined,
      consumersCount: consumers ? parseInt(consumers, 10) : undefined,
      capacity: capacity ? parseInt(capacity, 10) : undefined,
    };
    const output = await runSimulation(simOptions);
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
