import { LEGAL_EMAIL } from 'lib/config';

export default function termsOfServicePageRoute(req, res, next) {
  res.render('terms-of-service-page.njk', {
    title: 'Terms of Service',
    LEGAL_EMAIL,
  });
}
