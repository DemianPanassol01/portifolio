const Errors = require('./Errors');

module.exports.requireHTTPS = (req, res, next) => {
    if (!req.secure && process.env.NODE_ENV !== "development") {
        // return res.redirect('https://' + req.get('Host') + req.url);
        return next(new Errors('Conexão Insegura | Connection Unsafe', 401))
    }
    next();
};