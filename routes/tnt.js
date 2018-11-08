const express = require('express');
const router = express.Router();
const TntExplosion = require('../models/TntExplosionSchema');
const TntModel = require('../calcModels/TntExplosion.js');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

function checkIfOwner(req, res, next) {
    TntExplosion.findById(req.params.id)
        .then(tnt => {
            if (tnt.user.toString() === req.user._id.toString()) {
                req.tnt = tnt;
                return next();
            }
            res.redirect('/home');
        })
        .catch(err => {
            res.render('home', {err});
        })
}

router.post('/create', isLoggedIn, (req, res, next) => {
    /* Coordinates dummy for first save */
    let coordinates = [];
    let tntResultsArray = [];
    coordinates.push(req.body.lngTnt);
    coordinates.push(req.body.latTnt);
    req.body.user = req.user._id;
    req.body.location = {
        coordinates
    };

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
    req.body.hola = "hola que tal";
    // ------END CALCULATIONS ---------

    console.log("REQ BODY TNT: ",req.body)

    TntExplosion.create(req.body)
        .then(() => {
            res.redirect('/home');
        })
        .catch(err => {
            res.render('home', {
                err,
                msg: 'No se pudo crear el punto'
            });
        })
});

router.get('/delete/:id', isLoggedIn, checkIfOwner, (req, res) => {
    TntExplosion
        .findByIdAndRemove(req.tnt.id)
        .then(() => {
            res.redirect('/home');
        })
        .catch(err => {
            res.render('home', {err});
        });
});

router.get('/report/:id',isLoggedIn, checkIfOwner, (req, res) =>{
    TntExplosion
    .findById(req.tnt.id)
    .then(tntEvent => {
        res.render('reportTNT',{tntEvent});
    })
    .catch(err => {
        res.render('home', {err});
    })
})

module.exports = router;