import express from 'express';
import queue, { addJob, removeJob } from '../lib/queue';
import { scopeToAccountType } from './middleware/account';

// Routes
import facebookPost from './routes/facebook-post';
import twitterPost from './routes/twitter-post';
import twitterRetweet from './routes/twitter-retweet';
import linkedInPost from './routes/linkedin-post';
import linkedInShare from './routes/linkedin-share';
import account from './routes/account';
import rssPost from './routes/rss-post';
import rssFeed from './routes/feed';
import user from './routes/user';

const app = express();

app.queue = queue;
app.addJob = addJob;
app.removeJob = removeJob;

app.use('/facebook/accounts', scopeToAccountType('facebook'), account);
app.use('/facebook/posts', facebookPost);

app.use('/twitter/accounts', scopeToAccountType('twitter'), account);
app.use('/twitter/posts', twitterPost);
app.use('/twitter/retweets', twitterRetweet);

app.use('/linkedin/accounts', scopeToAccountType('linkedin'), account);
app.use('/linkedin/posts', linkedInPost);
app.use('/linkedin/shares', linkedInShare);

app.use('/accounts', account);

app.use('/rss/feeds', rssFeed);
app.use('/rss/posts', rssPost);

app.use('/users', user);

export default app;
