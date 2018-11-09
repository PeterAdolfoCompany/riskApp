const TntExplosion = require('../models/TntExplosionSchema');
const FireBall = require('../models/FireBallSchema');
const PoolFire = require('../models/PoolFireSchema');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
};
exports.checkIfOwner = (req, res, next) => {
    let schema = getSchema(req.params.type);
    schema.findById(req.params.id)
        .then(element => {
            if (element.user.toString() === req.user._id.toString()) {
                req.element = element;
                return next();
            }
            res.redirect('/home');
        })
        .catch(err => {
            res.render('home', {err});
        })
};

function getSchema(type) {
    switch (type) {
        case 'tnt':
            return TntExplosion;
        case 'fb':
            return FireBall;
        case 'pf':
            return PoolFire;
    }
}