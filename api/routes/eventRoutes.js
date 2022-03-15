const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const { upload } = require("../middleware/pictureMiddleware");
const auth = require("../middleware/eventMiddleware");

router.get('/', EventController.getAllEvents);
router.post('/', auth.isLoggedUser, upload.single('image'), EventController.saveNewEvent);
router.get('/:id', EventController.getOneEvent);
router.put('/:id', auth.isLoggedUser, upload.single('image'), EventController.updateEvent);
router.get('/:id/volunteers', EventController.getAssignedVolunteers);
router.get('/:id/comments', EventController.getEventComments);
router.get('/count/:isSucceeded', EventController.howManyEventsSucceeded);
router.post ('/:id/comments', auth.isLoggedUser, EventController.addEventComment);
router.delete ('/:id/comments/:commentId', auth.isLoggedUser, EventController.deleteEventComment);

module.exports = router;

