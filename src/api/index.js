import express from 'express';
import queue, { addJob, removeJob } from '../lib/queue';
import { scopeToAccountType } from './middleware/account';

// Routes
import facebookPost from './routes/facebook-post';
import facebookScheduledPost from './routes/facebook-scheduled-post';
import twitterPost from './routes/twitter-post';
import twitterScheduledRetweet from './routes/twitter-scheduled-retweet';
import twitterScheduledPost from './routes/twitter-scheduled-post';
import linkedinPost from './routes/linkedin-post';
import linkedinScheduledPost from './routes/linkedin-scheduled-post';
import account from './routes/account';
import rssPost from './routes/rss-post';
import rssFeed from './routes/rss-feed';
import upload from './routes/upload';
import user from './routes/user';

const app = express();

app.queue = queue;
app.addJob = addJob;
app.removeJob = removeJob;

app.use('/facebook/accounts', scopeToAccountType('facebook'), account);
app.use('/facebook/posts', facebookPost);
app.use('/facebook/scheduled-posts', facebookScheduledPost);

app.use('/twitter/accounts', scopeToAccountType('twitter'), account);
app.use('/twitter/posts', twitterPost);
app.use('/twitter/scheduled-posts', twitterScheduledPost);
app.use('/twitter/scheduled-retweets', twitterScheduledRetweet);

app.use('/linkedin/accounts', scopeToAccountType('linkedin'), account);
app.use('/linkedin/posts', linkedinPost);
app.use('/linkedin/scheduled-posts', linkedinScheduledPost);

app.use('/accounts', account);

app.use('/rss/feeds', rssFeed);
app.use('/rss/posts', rssPost);

app.use('/uploads', upload);

app.use('/users', user);

export default app;
