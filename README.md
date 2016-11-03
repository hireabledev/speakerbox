# SpeakerBox


## Mission

> To improve how constituents and local public agencies communicate with each other.


## Setup


## Development Setup

### Requirements

- Node.js (v6+) (use nvm to install)
- Postgres (use homebrew to install on macOS)
- Redis (for jobs to run) (use homebrew to install on macOS)


### Install Dependencies

    npm install


### Start the App

    npm start


### Environment Variables

Set the required environment variables defined in [./src/lib/config/index.js](./src/lib/config/index.js).


## Heroku

Login:

    heroku login


Create an app:

    heroku apps:create dasylabs


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
