import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as LinkedInStrategy } from 'passport-linkedin';
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

passport.use(new FacebookStrategy(
  {
    clientID: FB_KEY,
    clientSecret: FB_SECRET,
    callbackURL: FB_CB_URL,
    profileFields: ['id', 'displayName', 'photos'],
    passReqToCallback: true,
  },
  (req, token, tokenSecret, profile, done) => {
    const profileData = {
      displayName: profile.displayName,
      facebookId: profile.id,
      facebookToken: token,
      facebookTokenSecret: tokenSecret,
      photoUrl: profile.photos[0].value,
    };

    if (req.user) {
      return req.user.update(profileData)
        .then(() => done(null, req.user))
        .catch(done);
    }
    return req.app.models.User.findOrCreate({
      where: { facebookId: profile.id },
      defaults: profileData,
    })
      .spread(user => done(null, user))
      .catch(done);
  }
));

passport.use(new TwitterStrategy(
  {
    consumerKey: TWITTER_KEY,
    consumerSecret: TWITTER_SECRET,
    callbackURL: TWITTER_CB_URL,
    profileFields: ['id', 'email', 'photos'],
    passReqToCallback: true,
  },
  (req, token, tokenSecret, profile, done) => {
    const profileData = {
      displayName: profile.displayName,
      twitterId: profile.id,
      twitterToken: token,
      twitterTokenSecret: tokenSecret,
      photoUrl: profile.image_url_https,
    };

    if (req.user) {
      return req.user.update(profileData)
        .then(() => done(null, req.user))
        .catch(done);
    }
    return req.app.models.User.findOrCreate({
      where: { twitterId: profile.id },
      defaults: profileData,
    })
      .spread(user => done(null, user))
      .catch(done);
  }
));

passport.use(new LinkedInStrategy(
  {
    consumerKey: LINKEDIN_KEY,
    consumerSecret: LINKEDIN_SECRET,
    callbackURL: LINKEDIN_CB_URL,
    passReqToCallback: true,
  },
  (req, token, tokenSecret, profile, done) => {
    const profileData = {
      displayName: profile.displayName,
      linkedinId: profile.id,
      linkedinToken: token,
      linkedinTokenSecret: tokenSecret,
    };

    if (req.user) {
      return req.user.update(profileData)
        .then(() => done(null, req.user))
        .catch(done);
    }
    return req.app.models.User.findOrCreate({
      where: { linkedinId: profile.id },
      defaults: profileData,
    })
      .spread(user => done(null, user))
      .catch(done);
  }
));

export default passport;
