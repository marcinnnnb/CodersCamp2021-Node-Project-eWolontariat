
// const volunteer=require('../models/VolunteerForm')
// const jwt=require('jsonwebtoken')

// exports.volunteerauth=  (req,res,next)=>{
//  const token= req.header('auth-token');
//  if (!token) return res.status(401).send('Brak dostępu')
//     try{
//         const verified =jwt.verify(token, process.env.TOKEN_SECRET);
//         res.volunteer = verified;
//     }
//     catch(err){
//         res.status(400).send('Zły token')
//     }
//     next()
    
// }


// const token= jwt.sign({_id:Volunteer._id}, process.env.TOKEN_SECRET)
// console.log(_id)

// res.header('auth-token',token).send(token);

