import express from 'express';
import configureNunjucks from 'lib/nunjucks';

const app = express();

configureNunjucks(app, __dirname);

app.get('*', (req, res) => {
  res.render('spa-page.njk', {
    title: 'Dashboard',
  });
});

export default app;
