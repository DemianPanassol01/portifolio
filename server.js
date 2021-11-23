if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const session = require('cookie-session');

const app = express();

const inicioRouter = require('./routes/inicio.req');
const sobreRouter = require('./routes/sobre.req');
const contatoRouter = require('./routes/contato.req');
const Errors = require('./admin/Errors');
const { requireHTTPS } = require('./admin/middlewares');

app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'", "http://*"],
                scriptSrc: ["'self'", "https://*"],
                imgSrc: ["'self'", "data:", "https://*"],
            },
        }
    })
);
app.use(
    session({
        name: 'k02dcb234',
        maxAge: new Date(Date.now() + 360000),
        keys: [
            'HwaD*kRnCQ',
            'PCQg43#YUNvKkyi'
        ],
    })
);

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requireHTTPS);

app.get('/', (req, res) => {
    res.redirect('/inicio');
});

app.use(inicioRouter);
app.use(sobreRouter);
app.use(contatoRouter);

app.all("*", (req, res, next) => {
    next(new Errors("Página Não Encontrada | Page Not Found", 404));
});

app.use((err, req, res, next) => {
    let { message, statusCode = 500 } = err;

    res.status(statusCode).render("./error/error.ejs", { message, statusCode });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}`);
});