import express from 'express';

// Routes
const app = express();

app.get('/', (req, res) => {
  res.send('graphql');
});

export default app;
