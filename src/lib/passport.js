import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as LinkedinStrategy } from 'passport-linkedin-oauth2';
import { server as debug } from 'lib/debug';
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
        .catch(err => {
          debug.error(err);
          return done(err);
        });
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
    scope: ['manage_pages', 'publish_actions', 'user_photos', 'user_posts', 'user_videos'],
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
      name: profile.displayName,
      imgUrl: profile.photos[0].value,
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
    profileFields: ['id', 'displayName', 'photos'],
    userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
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
      name: profile.displayName,
      imgUrl: profile.photos[0].value,
      type: 'twitter',
    };
  },
}));

passport.use(getStrategy({
  Strategy: LinkedinStrategy,
  strategyOptions: {
    clientID: LINKEDIN_KEY,
    clientSecret: LINKEDIN_SECRET,
    callbackURL: LINKEDIN_CB_URL,
    scope: ['r_basicprofile', 'w_share', 'rw_company_admin'],
    state: true,
  },
  mapProfileToUser(profile) {
    debug.info(profile);
    const additionalProfile = profile._json || {}; // eslint-disable-line no-underscore-dangle
    return {
      displayName: profile.displayName,
      imgUrl: additionalProfile.pictureUrl,
    };
  },
  mapProfileToAccount(profile) {
    debug.info(profile);
    const additionalProfile = profile._json || {}; // eslint-disable-line no-underscore-dangle
    return {
      id: profile.id,
      name: profile.displayName,
      imgUrl: additionalProfile.pictureUrl,
      type: 'linkedin',
    };
  },
}));

export default passport;
