import express from 'express';
import configureNunjucks from 'lib/nunjucks';
import mixpanel from 'lib/mixpanel';

const app = express();

configureNunjucks(app, __dirname);

app.get('*', (req, res) => {
  mixpanel.track('Dashboard page viewed', { distinct_id: req.user ? req.user.id : req.session.id });
  req.visitor.pageview('Dashboard');
  res.render('spa-page.njk', {
    title: 'Dashboard',
    // SHOW_ADS: true,
  });
});

export default app;
