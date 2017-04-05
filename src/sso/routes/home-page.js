import mixpanel from 'lib/mixpanel';

export default function homePageRoute(req, res, next) {
  mixpanel.track('SSO page viewed', { distinct_id: req.user ? req.user.id : req.session.id });
  res.render('home-page.njk', {
    description: 'Single Sign On',
  });
}
