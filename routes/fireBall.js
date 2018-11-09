const express = require('express');
const router  = express.Router();
const FireBall = require('../models/FireBallSchema');
const FireBallModel = require('../calcModels/FireBall.js');
const validator = require('../helpers/validator');

router.post('/create', validator.isLoggedIn, (req, res, next) => {
    /* Coordinates dummy for first save */
    let coordinates = [];
    coordinates.push(req.body.lngFb);
    coordinates.push(req.body.latFb);

    req.body.user = req.user._id;
    req.body.location = {coordinates};

    //  --- CALCULATIONS -------
    let obj = {
        tempAmbC: parseFloat(req.body.fbAirTemp),
        humedadRelativa: parseFloat(req.body.fbHumidity),
        hckjkg: parseFloat(req.body.fbHckjkg),
        mass: parseFloat(req.body.fbMassRelease),
        radiationFraction: parseFloat(req.body.fbRadiationFraction),
        rad01: parseFloat(req.body.fbRad01),
        rad02: parseFloat(req.body.fbRad02),
        rad03: parseFloat(req.body.fbRad03),
    };


    let fireBall = new FireBallModel(obj);
    req.body.radio01 = fireBall.xDistanceToQTerm(req.body.fbRad01);
    req.body.radio02 = fireBall.xDistanceToQTerm(req.body.fbRad02);
    req.body.radio03 = fireBall.xDistanceToQTerm(req.body.fbRad03);
    // ------END CALCULATIONS ---------

    console.log("OBJETO FIRE BALL: ", req.body)

    FireBall.create(req.body)
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.render('home', {err, msg: 'No se pudo crear el punto'});
        })
});

router.get('/delete/:id/:type', validator.isLoggedIn, validator.checkIfOwner, (req, res) => {
    FireBall
        .findByIdAndRemove(req.element.id)
        .then(() => {
            res.redirect('/home');
        })
        .catch(err => {
            res.render('home', {err});
        })
    ;
});

router.get('/report/:id/:type',validator.isLoggedIn, validator.checkIfOwner, (req, res) =>{
    FireBall
    .findById(req.element.id)
    .populate('user', 'email')
    .then(fireBallEvent => {
        console.log("FIRE BALL: ",fireBallEvent)
        res.render('reportFireBall',{fireBallEvent});
    })
    .catch(err => {
        res.render('home', {err});
    })
});

module.exports = router;