
const jwt=require('jsonwebtoken');
const Volunteer  = require('../Models/VolunteerModel');


exports.Userdata= function (req,res,next) {
    const token = req.header('auth-token');

    if (!token) throw new Error ('Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }
},

exports.loggedVolunteer= async function (req,res,next) {
    const token = req.header('auth-token');
    let volunteer

    if (!token) throw new Error ('Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.');
    try {
        volunteer= await Volunteer.findById(req.params.id).populate('user');
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = verified._id;
        const volunteerId=volunteer.user.id;
        if(userId !== volunteerId) throw new Error('Odmowa dostępu. Bak możliwości zmiany danych dla tego użytkownika')
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }
}