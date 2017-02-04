import express from 'express';
import queue, { addJob, removeJob } from 'lib/queue';

// Routes
import account from './routes/account';
import feed from './routes/feed';
import post from './routes/post';
import scheduledPost from './routes/scheduled-post';
import upload from './routes/upload';
import user from './routes/user';

const app = express();

app.queue = queue;
app.addJob = addJob;
app.removeJob = removeJob;

app.use('/accounts', account);
app.use('/feeds', feed);
app.use('/posts', post);
app.use('/scheduled-posts', scheduledPost);
app.use('/uploads', upload);
app.use('/users', user);

export default app;
