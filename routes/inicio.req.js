const express = require('express');
const router = express.Router();

router.get('/inicio', (req, res) => {
    res.render('./pages/PT-BR/inicio.ejs', { title: 'Início' });
});

router.get('/home', (req, res) => {
    res.render('./pages/ENG/inicio.ejs', { title: 'Home' });
});


module.exports = router;