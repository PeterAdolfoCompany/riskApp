const express = require('express');
const router = express.Router();
const PoolFire = require('../models/PoolFireSchema');
const PFModel = require('../calcModels/PoolFire.js')


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

router.post('/create', isLoggedIn, (req, res, next) => {
    /* Coordinates dummy for first save */
    let coordinates = [];
    coordinates.push(req.body.pfLngPF);
    coordinates.push(req.body.pfLatPF);

    req.body.user = req.user._id;
    req.body.location = {
        coordinates
    };

    //  --- CALCULATIONS -------
    var leakTyFugaContinua = false;
    var leakTyFugaMasiva = false;
    var leakTyDiqueCircular = false;
    var leakTyDiqueNoCircular = false;
    switch (req.body.typeLeak) {
        case 1:
            leakTyFugaContinua = true
            break;
        case 2:
            leakTyFugaMasiva = true
            break;
        case 3:
            leakTyDiqueCircular = true
            break;
        case 4:
            leakTyDiqueNoCircular = true
            break;
        default:
            leakTyFugaMasiva = true
    }
    var typeIsburningRateStrasser = false;
    var typeIsburningRateMudan = false;
    switch (req.body.burningRateMethod) {
        case 1:
            typeIsburningRateStrasser = true
            break;
        case 2:
            typeIsburningRateMudan = true
            break;
        default:
        typeIsburningRateStrasser = true
    }
    var typeThomas = false;
    var typePritchard = false;
    switch (req.body.flameHeightMethod) {
        case 1:
        typeThomas = true
            break;
        case 2:
        typePritchard = true
            break;
        default:
        typeThomas = true
    }
    var typePoint = false;
    var typeSource = false;
    switch (req.body.calculationMethod) {
        case 1:
        typePoint = true
            break;
        case 2:
        typeSource = true
            break;
        default:
        typePoint = true
    }


    let obj = {
        tempAmbC: parseFloat(req.body.airTemp),
        velVientomseg: parseFloat(req.body.windVelocity),
        altitudM: parseFloat(req.body.altitude),
        humedadRel: parseFloat(req.body.humidity),
        name: req.body.pfSubstance,
        hva: parseFloat(req.body.pfHva),
        hvn: parseFloat(req.body.pfHvn),
        tc: parseFloat(req.body.pfTc),
        mw: parseFloat(req.body.pfMw),
        hckjkg: parseFloat(req.body.pfHckjkg),
        tb: parseFloat(req.body.pfTb),
        cpla: parseFloat(req.body.pfCpla),
        cplb: parseFloat(req.body.pfCplb),
        cplc: parseFloat(req.body.pfCplc),
        cpld: parseFloat(req.body.pfCpld),
        dliqa: parseFloat(req.body.pfDliqa),
        dliqb: parseFloat(req.body.pfDliqb),
        dliqn: parseFloat(req.body.pfDliqn),
        isFugacontinua: leakTyFugaContinua,
        isfugaMasiva: leakTyFugaMasiva,
        isDiqueCircular: leakTyDiqueCircular,
        isDiqueNoCircular: leakTyDiqueNoCircular,
        isburningRateStrasser: typeIsburningRateStrasser,
        isburningRateMudan: typeIsburningRateMudan,
        isAlturaFlamaThomas: typeThomas,
        isAlturaFlamaPritchard: typePritchard,
        isPointSourceModel: typePoint,
        combustionFractionPointSource: parseFloat(0.35),
        isSolidPlumeModel: typeSource,
        spillRate: parseFloat(req.body.flow),
        massRelease: parseFloat(req.body.massRelease),
        anchoDiqueNoCircular: parseFloat(req.body.heightCircularDike),
        largoDiqueNoCircular: parseFloat(req.body.widthCircularDike),
        diametroDiqueCircular: parseFloat(req.body.diameterCircularDike),
        rad01: parseFloat(req.body.pfRad01),
        rad02: parseFloat(req.body.pfRad02),
        rad03: parseFloat(req.body.pfRad03),
        timeExposition: parseFloat(req.body.timeExposition)
    }


    let poolFireEvent = new PFModel(obj)
    req.body.radio01 = poolFireEvent.xTermAtQNivelPiso(req.body.pfRad01)
    req.body.radio02 = poolFireEvent.xTermAtQNivelPiso(req.body.pfRad02)
    req.body.radio03 = poolFireEvent.xTermAtQNivelPiso(req.body.pfRad03)



    console.log("El OBJETO: ---- ", obj)
    // ------END CALCULATIONS ---------

    PoolFire.create(req.body)
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


module.exports = router;