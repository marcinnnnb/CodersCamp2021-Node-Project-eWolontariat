const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

router.get('/', EventController.getAllEvents);
router.post('/', EventController.saveNewEvent);
router.get('/:id', EventController.getOneEvent);
router.put('/:id', EventController.updateEvent);
router.get('/:id/volunteers', EventController.getAssignedVolunteers);
router.get('/:id/comments', EventController.getEventComments);
router.get('/category/:categoryId', EventController.getEventsByCategory);
router.get('/count/:isSucceeded',EventController.howManyEventsSucceeded);

module.exports = router;

