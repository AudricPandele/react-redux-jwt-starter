const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const Extract = require('passport-jwt').ExtractJwt;
const config = require('../../config');
const LocalStrategy = require('passport-local');

const jwtOptions = {
  jwtFromRequest: Extract.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  const userId = payload.sub;
  User.findById(userId, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const localOptions = { usernameField: 'email' };

const localLoginStrategy = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.isPasswordEqualTo(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});
passport.use(jwtLogin);
passport.use(localLoginStrategy);
