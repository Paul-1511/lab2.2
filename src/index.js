const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

// Additional routes can be added here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
