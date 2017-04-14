import mixpanel from 'lib/mixpanel';

export default function privacyPolicyPageRoute(req, res, next) {
  mixpanel.track('Privacy Policy page viewed', { distinct_id: req.user ? req.user.id : req.session.id });
  req.visitor.pageview('Privacy Policy');
  res.render('privacy-policy-page.njk', {
    title: 'Privacy Policy',
  });
}
