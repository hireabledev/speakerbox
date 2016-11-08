import express from 'express';

// Routes
const app = express();

app.get('*', (req, res) => {
  res.sendStatus(501);
});

export default app;
