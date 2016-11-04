import express from 'express';
import configureNunjucks from '../lib/nunjucks';

// Routes
const app = express();

configureNunjucks(app, __dirname);

app.get('/', (req, res) => {
  res.render('home-page.njk', {
    title: 'Dashboard',
  });
});

export default app;
