import express from 'express';
import passport from 'passport';
import configureNunjucks from '../lib/nunjucks';

// Routes
import homePage from './routes/home-page';

const app = express();

configureNunjucks(app, __dirname);

app.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['user_posts', 'publish_actions'],
  })
);
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/sso',
  })
);

app.get(
  '/auth/twitter',
  passport.authenticate('twitter')
);
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/sso',
  })
);

app.get(
  '/auth/linkedin',
  passport.authenticate('linkedin')
);
app.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/dashboard',
    failureRedirect: '/sso',
  })
);

app.get('/', homePage);

export default app;
