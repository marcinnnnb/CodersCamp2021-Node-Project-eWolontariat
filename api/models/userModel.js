const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName:{
        type: String,
        required: true,
        min:3,
        max:20,
        match: [/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,50}$/, 'Pole imię musi zawierać tylko litery']
    },
    lastName:{
        type: String,
        required: true,
        min:3,
        max:20,
        match: [/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,50}$/, 'Pole imię musi zawierać tylko litery']
    },
    login:{
        type: String,
        required: true,
        min:4,
        max:20,

        unique: true,

        match:[(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z<>!@#$%^&*?_=+-]{4,20}$/)]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Podano nieprawidłowy adres email']
    },
    password: {
        type: String,
        required: true,
        min:8

    },
    picture: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Picture"
    }],

})

module.exports = mongoose.model('User', userSchema)

const registerValidation= (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().required().min(3).max(20).regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,20}$/),
        lastName: Joi.string().required().min(3).max(20).regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,20}$/),
        login: Joi.string().required().min(4).max(20).regex(/^[0-9a-zA-Z]{4,20}$/),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z<>!@#$%^&*?_=+-]{8,}$/)
    }) 
    return schema.validate(data) 
}

const loginValidation= (data) =>{
    const schema = Joi.object({
        login: Joi.string().required().min(4).max(20).regex(/^[0-9a-zA-Z]{4,20}$/),
        password: Joi.string().required().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z<>!@#$%^&*?_=+-]{8,}$/)
    }) 
    return schema.validate(data) 
}


const updateValidation = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,20}$/),
        lastName: Joi.string().min(3).max(20).regex(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,20}$/),
        login: Joi.string().min(4).max(20).regex(/^[0-9a-zA-Z]{4,20}$/),
        email: Joi.string().email(),
        password: Joi.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z<>!@#$%^&*?_=+-]{8,}$/)
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;