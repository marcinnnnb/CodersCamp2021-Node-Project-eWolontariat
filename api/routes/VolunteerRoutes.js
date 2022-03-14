const express = require('express');
const router = express.Router();
const VolunteerController= require('../controllers/VolunteerController');
const auth = require('../middleware/VolunteerMiddleware');
const { upload } = require("../middleware/pictureMiddleware");

//getting one
router.get('/:id', VolunteerController.getOneVolunteer);

// getting all
router.get('/',VolunteerController.allVolunteers);

//updating one 
router.patch('/:id', auth.loggedVolunteer,  upload.single('image'), VolunteerController.updateVolunteer);

//creating 
router.post ('/', auth.Userdata, upload.single('image'), VolunteerController.createVolunteer);

//getting comments to particular one
router.get ('/:id/comments',VolunteerController.getVolunteerComments);

//add comments to particular one
router.post ('/:id/comments',auth.Userdata,VolunteerController.addVolunteerComment);

//delete comment frome particular one
router.delete ('/:id/comments/:commentId',auth.Userdata,VolunteerController.deleteVolunteerComment);

//getting events 
router.get ('/:id/events',VolunteerController.getVolunteerEvents);




module.exports=router

