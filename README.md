# SpeakerBox


## Mission

> To improve how constituents and services communicate with each other.


## Setup

### Requirements

- Node.js (v6+) (use nvm to install)
- Postgres (use homebrew to install on macOS)
- Redis (for jobs to run) (use homebrew to install on macOS)


### Environment Variables

Set the required environment variables defined in [./src/lib/config/index.js](./src/lib/config/index.js).

For local development, you can create a `.env` file in the project directory. Example:

```
FB_KEY=a1b2c3
FB_SECRET=a1b2c3
TWITTER_KEY=a1b2c3
TWITTER_SECRET=a1b2c3
LINKEDIN_KEY=a1b2c3
LINKEDIN_SECRET=a1b2c3
```


### Install Dependencies

    npm install


### Start the App

    npm start


### Start the worker

    npm run worker


### Run Tests

    npm test


### Creating Facebook/Twitter/LinkedIn Applications

In order to run SpeakerBox you must create social media applications. Use the following links for each network:

- [Facebook](https://developers.facebook.com/)
- [Twitter](https://apps.twitter.com/)
- [LinkedIn](https://www.linkedin.com/developer/apps/)


### Production Build

To create a production build run:

    npm run build

To run the app in production mode, run:

    NODE_ENV=production npm start


## Heroku

Login:

    heroku login


Create an app:

    heroku apps:create speakerbox


Set required environment vars defined in [./src/lib/config/index.js](./src/lib/config/index.js)

    heroku config:set SECRET="9328md9342mv39284u328j9383Um139fm49238m"


Provision postgres:

    heroku addons:create heroku-postgresql:hobby-dev


Provision redis:

    heroku addons:create heroku-redis:hobby-dev


Scale the app:

    heroku ps:scale web=1 worker=1


Open it:

    heroku open


## Generating Certificate

    certbot certonly --manual

    heroku config:set LETS_ENCRYPT_URL=".well-known/123" LETS_ENCRYPT_KEY="1a2b3c"


Press enter in the certbot prompt after heroku reboots.

    heroku certs:add server.crt server.key


Unset heroku environment variables when you are done.

    heroku config:unset LETS_ENCRYPT_URL LETS_ENCRYPT_KEY
