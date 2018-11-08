const express = require('express');
const router  = express.Router();
const TntExplosion = require('../models/TntExplosionSchema');
const FireBall = require('../models/FireBallSchema');
const PoolFire = require('../models/PoolFireSchema');


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('/auth/login');
});

router.get('/home',  isLoggedIn, (req, res, next) => {
  FireBall.find({user: req.user._id})
      .then(fireBall => {
          PoolFire.find({user: req.user._id})
              .then(poolFire => {
                  TntExplosion.find({user: req.user._id})
                      .then(tntExplosions =>{
                          res.render('home',{tntExplosions, fireBall, poolFire});
                      })
                      .catch(err => {
                          res.render('home', {err});
                      })
              })
              .catch(err => {
                  res.render('home', {err});
              })
      })
      .catch(err => {
          res.render('home', {err});
      })
});

module.exports = router;
