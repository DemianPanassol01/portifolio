const Errors = require('./Errors');

module.exports.requireHTTPS = (req, res, next) => {
    if (!req.secure || req.protocol !== 'https') {
        return next(new Errors('Conexão Insegura | Connection Unsafe', 401))
    }
    next();
};