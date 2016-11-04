import express from 'express';

// Routes
const app = express();

app.get('/', (req, res) => {
  res.send('api');
});

export default app;
