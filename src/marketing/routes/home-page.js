import mixpanel from 'lib/mixpanel';

export default function homePageRoute(req, res, next) {
  mixpanel.track('Homepage viewed', { distinct_id: req.user ? req.user.id : req.session.id });
  req.visitor.pageview('Home');
  res.render('home-page.njk', {
    description: 'Open source social media management platform.',
    // SHOW_ADS: true,
  });
}
