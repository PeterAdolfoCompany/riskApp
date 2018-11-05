const express = require('express');
const router = express.Router();
const TntExplosion = require('../models/TntExplosionSchema');
const tntModel = require('../calcModels/TntExplosion.js')





function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

router.post('/create', isLoggedIn, (req, res, next) => {
    /* Coordinates dummy for first save */
    let coordinates = [];
    coordinates.push(req.body.lngTnt);
    coordinates.push(req.body.latTnt);
    req.body.user = req.user._id;
    req.body.location = {
        coordinates
    };

    // RADIOS CALCS
    // let obj = {
    //     massRelease: parseFloat(req.body.massRelease),
    //     energyFraction: parseFloat(req.body.energyFraction),
    //     subsName: req.body.subsName,
    //     hckjkg: parseFloat(req.body.hckjkg)
    // }
    // let TnT = new tntModel(obj)
    // console.log("OBJETO: ---: ",obj)
    // console.log("PRESION----: ", req.body.overPressure02)
    // req.body.radio01 = TnT.overpressureToDistance(req.body.overPressure01)
    // req.body.radio02 = TnT.overpressureToDistance(req.body.overPressure02)
    // req.body.radio03 = TnT.overpressureToDistance(req.body.overPressure03)

    // console.log("RADIO1:"+req.body.radio01+"m RADIO 2: "+req.body.radio02+"m RADIO 3: "+req.body.radio03)


    TntExplosion.create(req.body)
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.render('home', {
                err,
                msg: 'No se pudo crear el punto'
            });
        })
});

// // GET DATA FROM MONGO
// router.get("/:id", (req, res) => {
//     TntExplosion.findById(req.params.id)
//         .then(tntEvent => {
//             console.log("TNT: ", tntEvent.location.coordinates)
//             //   res.render("detail",{tntEvent});
//         })
// });
module.exports = router;