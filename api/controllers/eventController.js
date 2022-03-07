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
  req.event = await Event.findById(req.params.id).populate("comments").populate("categories").catch(
    (error) => {
      res.status(400).json({
        error: 'There is no event with this ID'
      });
    }
  );
  let event = req.event;
  res.send(event);
};

exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findByIdAndUpdate(req.params.id, req.body).catch(
      (error) => {
        res.status(400).json({
          error: 'There is no event with this ID'
        });
      }
     );
     if(req.user._id!==event.owner.id) throw new Error("You can`t edit this event. You are not the author.");
     res.status(201).json({
      message: `Event id: ${event.id} updated successfully!`
    });
    } catch (error) {
      res.status(400).send({message:error.message});
    }
};

exports.getAssignedVolunteers = async (req, res) => {
  try {
    req.event = await Event.findById(req.params.id).populate("volunteers").catch(
      (error) => {
        res.status(400).json({
          error: 'There is no event with this ID'
        });
      }
    );
    let event = req.event;
    res.send(event.volunteers);
  } catch {
    (error) => {
      res.status(400).json({
        error: error.message
      });
    }
  } 
};

exports.getEventComments = async (req, res) => {
  try{
    const event = await Event.findById(req.params.id).populate("comments").catch(
      (error) => {  
        res.status(400).json({
          error: 'There is no event with this ID'
        });
      }
    );
    res.send(event.comments);
  } catch {
    (error) => {
      res.status(400).json({
        error: error.message
      });
    }
  };
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
        owner: req.user,
        organization: req.body.organization,
        shortDescription: req.body.shortDescription,
        dateStarted: req.body.dateStarted,
        dateExpired: req.body.dateExpired,
        volunteersNeeded: req.body.volunteersNeeded,
        categories: req.body.categories,
        picture: req.body.picture
        });

        event = await event.save().then(
          () => {
            res.status(201).json({
              message: `Event id: ${event.id} saved successfully!`
            });
          },
        ).catch(
          (error) => {
            res.status(400).json({
              error: error.message
            });
          }
        );
    } 
  };
