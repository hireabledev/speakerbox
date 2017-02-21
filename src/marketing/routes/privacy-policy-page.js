export default function privacyPolicyPageRoute(req, res, next) {
  res.render('privacy-policy-page.njk', {
    title: 'Privacy Policy',
  });
}
