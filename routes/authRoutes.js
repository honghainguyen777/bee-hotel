const passport = require('passport');

module.exports = app => {

    // login with google
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/home');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/home');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.post(
        '/auth/login',
        passport.authenticate('local', { failureRedirect: '/home', failureFlash: 'Invalid username or password.'}),
        (req, res) => {
            res.redirect('/home');
        }
    );

    app.post(
        '/auth/signup', passport.authenticate('local-signup', {
            successRedirect: '/home',
            failureRedirect: '/home',
            failureFlash: {
                type: 'messageFailure',
                message: 'Username has already taken.'
            },
            successFlash: {
                type: 'messageSuccess',
                message: 'Thank you for signing up!' 
            }
      })
    );
};