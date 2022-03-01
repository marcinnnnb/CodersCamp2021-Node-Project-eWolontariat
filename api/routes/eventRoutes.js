const express = require('express');
const Event = require("../models/eventModel");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello")
});

router.get('/new', (req, res) => {
    //res.render('events/new', { event: new Event() });
    res.send("hi")
});

router.post('/new', (req, res, next) => {
    
});

router.get('/edit/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render('events/edit', { event: event });
});

//get Event/:id
//put Event
//post Event
//get Events{category}
//get Event/Count/:succeeded
//get Event/:id/volunteers
//get Event/:id/comments



module.exports = router;