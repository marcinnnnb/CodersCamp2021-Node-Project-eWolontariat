const express = require('express');
const router = express.Router();
const commentsController= require('../controllers/commentsController')
const auth= require('../middleware/VolunteerMiddleware')


//getting one
router.get('/comment/:id', commentsController.getOneComment);
//updating one 
router.put('/comment/:id', auth.Userdata, commentsController.updateComment);


module.exports=router

