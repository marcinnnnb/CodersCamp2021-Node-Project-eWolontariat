const jwt = require('jsonwebtoken');
const Event = require('../models/eventModel');

exports.isLoggedUser = async (req, res, next) => {
    const token = req.header('auth-token');

    try {
       if (!token) throw new Error ('Access Denied. You have to log in!');
       const event = await Event.findById(req.params.id).catch((err)=> 
       {
            res.status(404)
            throw new Error('There is no event with this ID');
        });
       jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if(err) {
            console.error(err);
            throw new Error ('Invalid token');
        } else {
            req.user = decoded;
        }
        
    });
       next();
    }
    catch (error) {
        res.status(401).json({error: error.message});
    }
    
}