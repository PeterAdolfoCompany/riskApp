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
  TntExplosion.find()
      .then(tntExplosions =>{
          res.render('./partials/sideBarPartial',{tntExplosions});
      })
  // res.render('home');
});

module.exports = router;
