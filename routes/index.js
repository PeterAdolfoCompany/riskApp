const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* Ruta Home - Aqui debe entrar cuando ya esté autenticado el usuario */
router.get('/home', (req, res, next) => {
  res.render('home');
});

module.exports = router;
