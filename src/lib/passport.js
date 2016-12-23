import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as LinkedinStrategy } from 'passport-linkedin';
import {
  FB_KEY,
  FB_SECRET,
  FB_CB_URL,
  TWITTER_KEY,
  TWITTER_SECRET,
  TWITTER_CB_URL,
  LINKEDIN_KEY,
  LINKEDIN_SECRET,
  LINKEDIN_CB_URL,
} from './config';
import User from './models/user.model';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(done);
});

function getStrategy({ Strategy, strategyOptions, mapProfileToUser, mapProfileToAccount }) {
  return new Strategy(
    {
      passReqToCallback: true,
      ...strategyOptions,
    },
    (req, accessToken, tokenSecret, profile, done) => {
      const userData = mapProfileToUser(profile);
      const accountData = {
        accessToken,
        tokenSecret,
        ...mapProfileToAccount(profile),
      };

      const getUser = () => {
        if (req.user) {
          return Promise.resolve(req.user);
        }
        return req.app.models.User.findOne({
          include: [{
            model: req.app.models.Account,
            where: { id: profile.id },
          }],
        });
      };

      return getUser()
        .then(user => {
          if (user) { return user.update(userData).then(() => (user)); }
          return req.app.models.User.create(userData);
        })
        .then(user => (
          user.getAccounts({
            where: { id: profile.id },
          })
            .then(([account]) => {
              if (account) { return account.update(accountData).then(() => (account)); }
              return req.app.models.Account.create({
                ...accountData,
                userId: user.id,
              });
            })
            .then(() => done(null, user))
        ))
        .catch(done);
    }
  );
}

passport.use(getStrategy({
  Strategy: FacebookStrategy,
  strategyOptions: {
    clientID: FB_KEY,
    clientSecret: FB_SECRET,
    callbackURL: FB_CB_URL,
    profileFields: ['id', 'displayName', 'photos'],
  },
  mapProfileToUser(profile) {
    return {
      displayName: profile.displayName,
      imgUrl: profile.photos[0].value,
    };
  },
  mapProfileToAccount(profile) {
    return {
      id: profile.id,
      type: 'facebook',
    };
  },
}));

passport.use(getStrategy({
  Strategy: TwitterStrategy,
  strategyOptions: {
    consumerKey: TWITTER_KEY,
    consumerSecret: TWITTER_SECRET,
    callbackURL: TWITTER_CB_URL,
    profileFields: ['id', 'email', 'photos'],
    userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
  },
  mapProfileToUser(profile) {
    return {
      displayName: profile.displayName,
      imgUrl: profile.image_url_https,
    };
  },
  mapProfileToAccount(profile) {
    return {
      id: profile.id,
      type: 'twitter',
    };
  },
}));

passport.use(getStrategy({
  Strategy: LinkedinStrategy,
  strategyOptions: {
    consumerKey: LINKEDIN_KEY,
    consumerSecret: LINKEDIN_SECRET,
    callbackURL: LINKEDIN_CB_URL,
  },
  mapProfileToUser(profile) {
    return {
      displayName: profile.displayName,
    };
  },
  mapProfileToAccount(profile) {
    return {
      id: profile.id,
      type: 'linkedin',
    };
  },
}));

export default passport;
