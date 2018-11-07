const express = require('express');
const router  = express.Router();
const FireBall = require('../models/FireBallSchema');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

router.post('/create', isLoggedIn, (req, res, next) => {
    /* Coordinates dummy for first save */
    let coordinates = [];
    coordinates.push(req.body.lngFb);
    coordinates.push(req.body.latFb);

    req.body.user = req.user._id;
    req.body.location = {coordinates};

    //  --- CALCULATIONS -------
    let obj = {
        massRelease: parseFloat(req.body.massRelease),
        energyFraction: parseFloat(req.body.energyFraction),
        subsName: req.body.subsName,
        hckjkg: parseFloat(req.body.hckjkg)
    };
    let TnT = new TntModel(obj);
    req.body.radio01 = TnT.overpressureToDistance(req.body.overPressure01);
    req.body.radio02 = TnT.overpressureToDistance(req.body.overPressure02);
    req.body.radio03 = TnT.overpressureToDistance(req.body.overPressure03);
    // ------END CALCULATIONS ---------

    FireBall.create(req.body)
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.render('home', {err, msg: 'No se pudo crear el punto'});
        })
});


module.exports = router;