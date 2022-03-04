const express = require('express');
const router = express.Router();
const commentsController= require('../controllers/commentsController')
const auth= require('../middleware/VolunteerMiddleware')


//getting one
router.get('/:id', commentsController.getOneComment);
//updating one 
router.put('/:id', commentsController.updateComment);

//creating 
router.post ('/', auth.Userdata , commentsController.createComment);

//delete comment
router.delete('/:id',commentsController.deleteComment)


module.exports=router

