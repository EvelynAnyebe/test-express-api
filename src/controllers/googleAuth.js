import passport from 'passport';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import User from '../models/user.js';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ email: profile._json.email });
      if (!user) {
        user = await new User({
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile._json.email,
          password: profile._json.email,
          emailVerified: true,
          accountStatus: true,
          avater: profile._json.picture,
          authType: 'google',
        }).save();
      }
      cb(null, user.toObject());
    }
  )
);
