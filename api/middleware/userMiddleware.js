const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.loggedUser = async (req, res, next) => {

    const token = req.header('auth-token');

    if (!token) return res.status(401).send({message:'Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika'});

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=> {
            if(err) {
                throw new Error('Nieprawidłowy Token');
            } else {
                req.user = decoded;
            }            
        });

        if (req.params.id) {
                const user = await User.findById(req.params.id).select('-password').catch((err)=> 
            {
                res.status(404);
                throw new Error('There is no user with this ID');
            });

            if(!user) {
                res.status(404);
                throw new Error("No user found!");
            };
        
            if(req.user._id !== req.params.id) {
                res.status(403);
                throw new Error('Odmowa dostępu. Bak możliwości zmiany danych dla tego użytkownika');
            };
        };

        if (req.params.login) {
            const user = await User.findById(req.user._id).exec().catch((err)=> 
            {
                res.status(404);
                throw new Error('There is no user with this login');
            });

            if(!user) {
                res.status(404);
                throw new Error("No user found!");
            };
        
            if(req.params.login !== user.login) {
                res.status(403);
                throw new Error("You can`t get this data. It`s not your login");
            };
        };
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }
}




