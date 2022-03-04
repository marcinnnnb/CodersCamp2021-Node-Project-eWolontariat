
const jwt=require('jsonwebtoken');
const Volunteer  = require('../Models/VolunteerModel');


exports.Userdata= function (req,res,next) {
    const token = req.header('auth-token');
    console.log(token)

    if (!token) return res.status(401).send({message:'Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.'});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified)
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }
    // const userId=req.session.User._id
},

exports.loggedVolunteer= async function (req,res,next) {
    const token = req.header('auth-token');
    let volunteer
    console.log(token)

    if (!token) return res.status(401).send({message:'Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.'});
    try {
        volunteer= await Volunteer.findById(req.params.id)
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified._id)
        const userId = new verified._id;
        const volunteerId=volunteer.user;
        // let volunteerId2= volunteerId.str
        console.log(volunteerId)
        if(userId !== volunteerId){return res.status(401).send('Odmowa dostępu. Bak możliwości zmiany danych dla tego użytkownika')}
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }
    // const userId=req.session.User._id
}