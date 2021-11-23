const express = require('express');
const router = express.Router();

router.get('/sobre', (req, res) => {
    res.render('./pages/PT-BR/sobre.ejs', { title: 'Sobre' });
});

router.get('/about', (req, res) => {
    res.render('./pages/ENG/sobre.ejs', { title: 'About' });
});


module.exports = router;