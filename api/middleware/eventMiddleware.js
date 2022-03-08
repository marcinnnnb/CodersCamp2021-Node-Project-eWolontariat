const jwt = require('jsonwebtoken');
const Event = require('../models/eventModel');

exports.isLoggedUser = async (req, res, next) => {
    const token = req.header('auth-token');

    try {
       if (!token) {
           res.status(401);
           throw new Error ('Access Denied. You have to log in!');
       } 

       jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if(err) {
                console.error(err);
                throw new Error ('Invalid token');
            } else {
                req.user = decoded;
            }
         });

        if (req.params.id && req.method === "PUT") {
            const event = await Event.findById(req.params.id).catch((err)=> 
            {
                res.status(404);
                throw new Error('There is no event with this ID');
            });

            if(!event) {
                res.status(404);
                throw new Error("No event found!");
            };
        
            if(req.user._id !== event.owner.toString()) {
                res.status(403);
                throw new Error("You can`t edit this event. You are not the author.");
            };
        }
       next();
    }
    catch (error) {
       console.error(error);
       return res.json({error: error.message});
    }    
}