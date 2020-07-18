const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys');
const bcrypt   = require('bcrypt-nodejs')

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
                // const user = await new User({
                //     'google.id': profile.id,
                //     'google.name': profile.displayName,
                //     'google.firstname': profile.name.givenName,
                //     'google.lastname': profile.name.familyName,
                //     'google.email': profile.emails[0].value,
                //     'google.picture': profile.photos[0].value,
                // }).save();
                var newUser = new User();
                newUser.google.id = profile.id;
                newUser.google.name = profile.displayName;
                newUser.google.firstname = profile.name.givenName;
                newUser.google.lastname = profile.name.familyName;
                newUser.google.email = profile.emails[0].value;
                newUser.google.picture = profile.photos[0].value;
                newUser.google.admin = false;
                newUser.save();
            }
            return done(null, existingUser);
        }
    )
);

passport.use('local-login',
    new LocalStrategy((username, password, done) => {
        User.findOne({ 'local.username': username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found!')); 
            }
            if (!user.verifyPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Password does not match!'));
            }
            return done(null, user);
        });
    })
);

passport.use(
    'local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        // access to body of incomming request
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        let user = await User.findById('local.username', username);
        if (user) { return done(null, false)}
        let newUser = await User.create({
            'local.username': username,
            'local.password': bcrypt.hashSync(password, 10),
            'local.firstname': req.body.firstname,
            'local.lastname': req.body.lastname,
            'local.email': req.body.email
        })
        return done(null, newUser);
    })
);