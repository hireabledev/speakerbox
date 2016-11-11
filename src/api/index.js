import express from 'express';

// Routes
import post from './routes/post';
import user from './routes/user';

const app = express();

app.use('/posts', post);
app.use('/users', user);

app.get('*', (req, res) => {
  res.sendStatus(501);
});

export default app;
