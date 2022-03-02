const Event = require("../models/eventModel");

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ dateStarted: 'desc' });
  res.send({ events: events });
}

exports.getEventsByCategory =  async (req, res) => {
  const events = await Event.find({categories: req.params.categoryId}).sort({ dateStarted: 'desc' });
  res.send({ events: events });
}

exports.saveNewEvent = (async (req, res, next) => {
  req.event = new Event();
  next();
}, saveEvent());

exports.getOneEvent = async (req, res) => {
  req.event = await Event.findById(req.params.id);
  let event = req.event;
  res.send(event);
};

exports.updateEvent = (async (req, res, next) => {
  req.event = await Event.findById(req.params.id);
  next();
}, saveEvent());

exports.getAssignedVolunteers = async (req, res) => {
  req.event = await Event.findById(req.params.id);
  let event = req.event;
  res.send(event.volunteers);
};

exports.getEventComments = async (req, res) => {
  req.event = await Event.findById(req.params.id);
  let event = req.event;
  res.send(event.comments);
};

exports.howManyEventsSucceeded =  async (req, res) => {
  const events = await Event.find({isSucceeded: req.params.isSucceeded}).count();
  res.send({ events: events });
};

function saveEvent() {
  return async (req, res, next) => {
      let event = new Event({
          title: req.body.title,
          description: req.body.description,
          owner: req.body.owner,
          organization: req.body.organization,
          shortDescription: req.body.shortDescription,
          dateStarted: req.body.dateStarted,
          dateExpired: req.body.dateExpired,
          volunteersNeeded: req.body.volunteersNeeded,
          isSucceeded: req.body.isSucceeded,
          categories: req.body.categories,
          picture: req.body.picture
      } );

      req.event = event;
  
      event = await event.save().then(
          () => {
            res.status(201).json({
              message: 'Event saved successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
  }
}
