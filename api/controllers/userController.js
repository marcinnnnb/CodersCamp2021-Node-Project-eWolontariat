const User = require('../model/User')
const  {registerValidation, loginValidation}= require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registration = async (req,res) => {

    const {error} = registerValidation(req.body)
     if(error) return res.status(400).send(error.details[0].message);
 
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Email already exists')
 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt)
 
     const user = new User({
         firstName: req.body.firstName,
         lastName:req.body.lastName,
         login: req.body.login,
         email: req.body.email,
         password: hashedPassword
     });
     try{
         const savedUser = await user.save();
         res.send({ user: user._id})
     }catch (err){
         res.status(400).send(err);
     }
 }



exports.logging = async (req,res) => {

    const {error} = loginValidation(req.body)
     if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({login: req.body.login});
     if(!user) return res.status(400).send('Podany login nie istnieje.')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Podane hasło nie')

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

}

exports.getUser = async (req, res) => {
   try{
    const user = await User.findById(req.params.id)
    if (!user)
    return res
      .status(404)
      .send({ message: 'Użytkownik o podanym id nie istnieje.' });
    res.status(200).send(user);
   }catch(err){
    res.status(400).send(err);
   }
}

exports.updatedUser = async (req, res) => {
    try{
        const updatedUser = await User.updateOne({_id:req.params.id}, {$set:{firstName: req.body.firstName, lastName:req.body.lastName,login:req.body.login}})
        res.status(200).send({
            message: 'Zaktualizowano dane'})
        res.send(updatedUser)
    }catch(err){
        res.status(400).send({ error: err.message })
    }
  };