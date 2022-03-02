const User = require('../models/userModels')
const  {registerValidation, loginValidation, updateValidation}= require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.registration = async (req,res) => {

    const {error} = registerValidation(req.body)
     if(error) return res.status(400).send('Podane dane nie spełniają kryterium.');
 
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Podany email już istnieje.')
 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt)
     try{
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword
        });
        
      const newUser=await user.save()
      console.log(newUser)
      res.status(201).send('Rejestracja przebiegła pomyślnie.')
      } catch(err) {
        res.status(400).json({message:err.message})
      }
      }
    



exports.logging = async (req,res) => {

    const {error} = loginValidation(req.body)
     if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({login: req.body.login});
     if(!user) return res.status(400).send('Podany login nie istnieje.')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Podane hasło nie istnieje.')

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send('Jesteś zalogowany!')
    console.log(token)

}

exports.getUser = async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (isIdValid) {
      const user = await User.findById({_id:req.params.id}).select('-password');
      if (!user)
        return res
          .status(404)
          .send( 'Podany użytkownik nie istnieje.');
      res.status(200).send(user);
    } else {
      res.status(400).send('Podano nieprawidłowy numer id');
    }
  };

exports.updatedUser = async (req, res) => {

    const {error} = updateValidation(req.body)
     if(error) return res.status(400).send(error.details[0].message);

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt)

    try {
        const updatedUser = await User
          .findOneAndUpdate(
            {_id: req.params.id},
            {
             firstName : req.body.firstName,
             lastName : req.body.lastName,
             login: req.body.login,
             email: req.body.email,
             password: hashedPassword
            },
            { new: true }
          )
          .exec()
          console.log(updatedUser)
    
        if (!updatedUser) {
          return res.status(400).send(' Nie ma takiego użytkownika')
        }
        res.status(200).send('Zaktualizowano dane')
      } catch (e) {
        console.error(e)
        res.status(400).send('Error')
      }
    }