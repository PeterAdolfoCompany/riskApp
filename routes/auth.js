const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const mail = require('../helpers/mailer');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    if(req.body.password !== req.body['password-confirm']) {
        return res.render('register', {err: 'Tus contraseñas no son iguales'})
    }

    const {username, email, password} = req.body;
    User.register({username, email}, password)
        .then(user => {
            const options = {
                username: user.username,
                email: user.email,
                subject: 'Welcome to Risk App.',
                from: 'Risk App',
                filename: 'verify',
                message: 'Please confirm your email address to complete your subscription'
            };
            mail.send(options);
            res.redirect('/auth/login');
        })
        .catch(err => {
            res.status(500).render('register', {err: 'Error: The user could not be registered!!'})
        })
});

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;