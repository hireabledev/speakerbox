export default function homePageRoute(req, res, next) {
  res.render('privacy-policy-page.njk', {
    title: 'Privacy Policy',
  });
}
