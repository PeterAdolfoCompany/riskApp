const express = require('express');
const router  = express.Router();
const PoolFire = require('../models/PoolFireSchema');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

router.post('/create', isLoggedIn, (req, res, next) => {
    /* Coordinates dummy for first save */
    let coordinates = [];
    coordinates.push(req.body.pfLngTnt);
    coordinates.push(req.body.pfLatTnt);

    req.body.user = req.user._id;
    req.body.location = {coordinates};
    PoolFire.create(req.body)
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.render('home', {err, msg: 'No se pudo crear el punto'});
        })
});


module.exports = router;