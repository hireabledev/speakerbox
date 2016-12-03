import express from 'express';

// Routes
import facebookPost from './routes/facebook-post';
import twitterPost from './routes/twitter-post';
import linkedinPost from './routes/linkedin-post';
import rssPost from './routes/rss-post';
import account from './routes/account';
import feed from './routes/feed';
import user from './routes/user';

const app = express();

app.use('/accounts/facebook/posts', facebookPost);
app.use('/accounts/twitter/posts', twitterPost);
app.use('/accounts/linkedin/posts', linkedinPost);
app.use('/accounts', account);
app.use('/feeds/posts', rssPost);
app.use('/feeds', feed);
app.use('/users', user);

export default app;
