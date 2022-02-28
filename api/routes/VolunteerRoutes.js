const express = require('express');
const router = express.Router();
const VolunteerController= require('../controllers/VolunteerController')

//getting one
router.get('/:id',VolunteerController.getOneVolunteer);
//updating one 
router.patch('/:id', VolunteerController.updateVolunteer);

//creating 
router.post ('/', VolunteerController.createVolunteer);

// sort by category
router.get ('/{category}');

//getting comments to particular one
router.get ('/:id/comments');

//getting events 
router.get ('/:id/Events');


module.exports=router