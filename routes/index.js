const express = require('express');
const router  = express.Router();
const TntExplosion = require('../models/TntExplosionSchema');


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('/auth/login');
});

router.get('/home',  isLoggedIn, (req, res, next) => {
  TntExplosion.find({user: req.user._id})
      .then(tntExplosions =>{
          res.render('home',{tntExplosions});
      })
      .catch(err => {
          res.render('home', {err});
      })
});

module.exports = router;
