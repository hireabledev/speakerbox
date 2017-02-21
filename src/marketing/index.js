import express from 'express';
import configureNunjucks from 'lib/nunjucks';

// Routes
import homePage from './routes/home-page';
import privacyPolicyPage from './routes/privacy-policy-page';
import termsOfServicePage from './routes/terms-of-service-page';

const app = express();

configureNunjucks(app, __dirname);

app.get('/privacy-policy', privacyPolicyPage);
app.get('/terms', termsOfServicePage);
app.get('/', homePage);

export default app;
