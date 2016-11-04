export default function homePageRoute(req, res, next) {
  res.render('home-page.njk', {
    description: 'Open source social media management platform.',
  });
}
