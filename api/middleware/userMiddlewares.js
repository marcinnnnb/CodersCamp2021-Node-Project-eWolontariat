const jwt = require('jsonwebtoken');

exports.loggedUser = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Nieprawidłowy token.')
    }
}