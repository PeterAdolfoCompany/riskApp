const express = require('express');
const router  = express.Router();
const TntExplosion = require('../models/TntExplosionSchema');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

router.post('/create', isLoggedIn, (req, res, next) => {
    TntExplosion.create(req.body)
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.render('home', {err, msg: 'No se pudo crear el punto'});
        })
});


module.exports = router;