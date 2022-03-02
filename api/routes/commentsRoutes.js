const express = require('express');
const router = express.Router();
const commentsController= require('../controllers/commentsController')


//getting one
router.get('/:id', commentsController.getOneComment);
//updating one 
router.put('/:id', commentsController.updateComment);

//creating 
router.post ('/', commentsController.createComment);

//delete comment
router.delete('/:id',commentsController.deleteComment)


module.exports=router

