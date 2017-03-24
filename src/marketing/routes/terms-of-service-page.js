import { LEGAL_EMAIL } from 'lib/config';
import mixpanel from 'lib/mixpanel';

export default function termsOfServicePageRoute(req, res, next) {
  mixpanel.track('Terms of Service viewed', { distinct_id: req.user ? req.user.id : req.session.id });
  res.render('terms-of-service-page.njk', {
    title: 'Terms of Service',
    LEGAL_EMAIL,
  });
}
