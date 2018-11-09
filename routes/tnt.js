const express = require('express');
const router = express.Router();
const TntExplosion = require('../models/TntExplosionSchema');
const TntModel = require('../calcModels/TntExplosion.js');
const validator = require('../helpers/validator');

router.post('/create', validator.isLoggedIn, (req, res, next) => {
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
    // ------END CALCULATIONS ---------

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

router.get('/delete/:id/:type', validator.isLoggedIn, validator.checkIfOwner, (req, res) => {
    TntExplosion
        .findByIdAndRemove(req.element.id)
        .then(() => {
            res.redirect('/home');
        })
        .catch(err => {
            res.render('home', {err});
        })
    ;
});

module.exports = router;