const jwt = require('jsonwebtoken');
const User = require('../model/User')

exports.loggedUser = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({message: 'Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.'});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send({message: 'Nieprawidłowy token.'})
    }
}


exports.getUserId =async function (req,res,next){
    let user;
    try{
        user = await User.findById(req.params.id)
        if(!user) return res.statut(404).send({message: "Podany użytkownik nie istnieje."})
    }catch(err){
        return res.status(500).send({message: err.message})
    }
    res.user = user
    next()
}