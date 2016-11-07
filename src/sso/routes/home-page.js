export default function homePageRoute(req, res, next) {
  res.render('home-page.njk', {
    description: 'Single Sign On',
  });
}
