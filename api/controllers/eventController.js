const Event = require("../models/eventModel");
const User = require("../models/userModel");
const Organization = require("../models/eventModel");

exports.getAllEvents = async (req, res) => {
  let events;
  try {

  if (!req.query.category){
    events = await Event.find().sort({ dateStarted: 'desc' });
    
  } else {
    events = [];
    search = await Event.find({
      $or: [
        { 'title': { $regex: '.*' + req.query.search + '.*' } },
        { 'description': { $regex: '.*' + req.query.search + '.*' } },
        { 'shortDescription': { $regex: '.*' + req.query.search + '.*' } }
      ]
    }).populate({
      path: 'categories',
      match: {
        name: req.query.category
      }
    }).exec();  
    events.push(search);
  };

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.send({ events: events });

};

exports.searchEventsBy =  async (req, res) => {
  let events = [];
  let search= "";
  try {
    
      search = await Event.find({
        $or: [
          { 'title': { $regex: '.*' + req.query.search + '.*' } },
          { 'description': { $regex: '.*' + req.query.search + '.*' } },
          { 'shortDescription': { $regex: '.*' + req.query.search + '.*' } }
        ]
      }).populate('categories').sort({ dateStarted: 'desc' });

      if(!req.query.search) {
        events = [];
        throw new Error("You have to write something...");
      }
      events.push(search);
    
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
  return res.send({ events: events });
};

exports.saveNewEvent = (async (req, res, next) => {
  req.event = new Event();
  next();
}, saveEvent());

exports.getOneEvent = async (req, res) => {
  let event;
  try{
    event = await Event.findById(req.params.id).populate("comments").populate("categories").catch(error=>{
      throw new Error('There is no event with this ID');
    });
  } catch (error) {
    return res.status(400).send({message:error.message});
  };
  return res.send(event);
};

exports.updateEvent = async (req, res) => {
  let event;
  try {
    event = await Event.findByIdAndUpdate(req.params.id, req.body).catch(error=>{
      throw new Error('There is no event with this ID');
    });
    } catch (error) {
      return res.status(400).send({message:error.message});
    };
    return res.status(201).json({ message: `Event id: ${event.id} updated successfully!`});
};

exports.getAssignedVolunteers = async (req, res) => {
  let event;
  try {
    event = await Event.findById(req.params.id).populate("volunteers").catch(error=>{
      throw new Error('There is no event with this ID');
    });
  } catch (error) {
      return res.status(400).json({ error: error.message });
  };
  return res.send(event.volunteers);
};

exports.getEventComments = async (req, res) => {
  let event;
  try{
    event = await Event.findById(req.params.id).populate("comments").catch(error=>{
      throw new Error('There is no event with this ID');
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
  res.send(event.comments);
};

exports.howManyEventsSucceeded =  async (req, res) => {
  const events = await Event.find({isSucceeded: req.params.isSucceeded}).count();
  return res.send({ events: events });
};

function saveEvent() {
  return async (req, res, next) => {
    try {
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

        Event.create(event, (err, item) => {
          User.findOneAndUpdate(
            { _id: req.user}, 
            { $push: { events: item } }).catch(error=>{
              throw new Error('There is no event with this ID');
            });

            //dodać dla organizacji findOneAndUpdate

            item.save();
            res.status(201).json({
              message: `Event id: ${event.id} saved successfully!`
            });
      });
    } catch(error) {
      return res.status(400).json({message: error.message})
    }
      
    } 
  };
