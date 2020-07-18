const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');
const cors = require('./cors');

var router = express.Router();
router.use(bodyParser.json());

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// router.get('/google/callback', passport.authenticate('google'), (req, res) => {
//     res.redirect('/home');
// });

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/home',
	failureRedirect: '/auth/google'
}))

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

router.post('/signup', (req, res, next) => {
    User.register(new User({}))
});

router.get('/logout', (req, res, next) => {
    if (req.session) {
        // req.session.destroy(); for express-session
        res.session = null;
        res.clearCookie('session-id');
        res.redirect('/');
    }
});

module.exports = router;

// module.exports = app => {

//     // login with google
//     // app.get('/auth/google',
//     //     passport.authenticate('google', {
//     //         scope: ['profile', 'email']
//     //     })
//     // );

//     // app.get(
//     //     '/auth/google/callback',
//     //     passport.authenticate('google'),
//     //     (req, res) => {
//     //         res.redirect('/home');
//     //     }
//     // );

//     app.get('/api/logout', (req, res) => {
//         req.logout();
//         res.redirect('/home');
//     });

//     app.get('/api/current_user', (req, res) => {
//         res.send(req.user);
//     });

//     app.post(
//         '/auth/login',
//         passport.authenticate('local-login', { failureRedirect: '/home', failureFlash: 'Invalid username or password.'}),
//         (req, res) => {
//             res.redirect('/home');
//         }
//     );

//     app.post(
//         '/auth/signup', passport.authenticate('local-signup', {
//             successRedirect: '/home',
//             failureRedirect: '/home',
//             failureFlash: {
//                 type: 'messageFailure',
//                 message: 'Username has already taken.'
//             },
//             successFlash: {
//                 type: 'messageSuccess',
//                 message: 'Thank you for signing up!' 
//             }
//       }),
//       (req, res) => {
//           res.redirect('/home');
//       }
//     );
// };