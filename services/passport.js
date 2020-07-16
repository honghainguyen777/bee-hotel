const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ 'google.id': profile.id });
            if (!existingUser) {
                const user = await new User({
                    'google.id': profile.id,
                    'google.name': profile.displayName,
                    'google.firstname': profile.name.givenName,
                    'google.lastname': profile.name.familyName,
                    'google.email': profile.emails[0].value,
                    'google.picture': profile.photos[0].value
                }).save();
            }
            done(null, existingUser);
        }
    )
);