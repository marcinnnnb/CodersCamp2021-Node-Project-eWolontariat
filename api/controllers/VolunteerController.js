const mongoose = require('mongoose');
const Volunteer = require('../models/VolunteerModel');
const User = require('../models/userModel');
const url= require('url');
const {createComment,deleteComment}  = require('./commentsController');
const {createRate}= require('./rateController');
const { countDocuments } = require('../models/commentsModel');


// Get one volunteer
exports.getOneVolunteer= async (req,res)=>{
  let volunteerById
  try {
    volunteerById= await Volunteer.findById(req.params.id)
    .populate('categories')
    .populate('comments')
    .catch(error => {
      console.log(error);
      res.status(404)
      throw new Error('Nie ma takiego wolontariusza');
    })
    if(volunteerById == null){
      res.status(404)
       throw new Error('Nie ma takiego wolontariusza')
    }
  } catch(error){
    return res.json({message:error.message})
  }
  return res.send(volunteerById)
}

//GET all volunteers or sort by category
exports.allVolunteers = async (req, res, next) => {
  
  const queryObject= url.parse(req.url,true).query;
  let firstName = queryObject.firstName || "";
  let lastName = queryObject.lastName || "";
  let volunteers;
   
  try{    

  if(!queryObject.categories) {
    volunteers= await Volunteer.find({  firstName : { $regex: '.*' + firstName   + '.*' }, lastName : { $regex: '.*' + lastName + '.*' }})
      .populate('categories').populate('user', '-password').exec();
  } else {
    volunteers = await Volunteer.find({ firstName : { $regex: '.*' + firstName   + '.*' }, lastName : { $regex: '.*' + lastName + '.*' }}).populate({
      path: 'categories',
      match: {
        name: queryObject.categories
      }
    }).exec();  

    volunteers = volunteers.filter(function(volunteer) {
      if(Array.isArray(volunteer.categories)) {
        return volunteer.categories.length > 0;
      } 
    })
  }  
  return res.send(volunteers);
  }catch(error){
    return res.json({message:error.message})
  }
};

  //PATCH volunteer -> 
  exports.updateVolunteer = async (req, res) => {
    
  try {
    const updatedVolunteer = await Volunteer
      .findByIdAndUpdate(
         req.params.id,req.body,{ new: true }
      )
      .exec().catch(error => {
        console.log(error);
        res.status(404)
        throw new Error('Nie ma takiego wolontariusza');
      })

    if (!updatedVolunteer) {
      res.status(404)
      throw new Error (' Nie ma takiego wolontariusza')
    }
    res.status(200).json({ data: updatedVolunteer })
  } catch (error) {
    console.error(error)
    res.send({message:error.message})
  }

};


  // POST volunteer

  exports.createVolunteer = async (req, res)=>{
    try{
    const user = await User.findById(req.user);

    const volunteer = new Volunteer({
     user:req.user,
     firstName: user.firstName,
     lastName: user.lastName,
     categories:  req.body.categories,
     description: req.body.description,
     shortDescription: req.body.shortDescription,
     avatar: req.body.avatar
    })
  const newVolunteer=await volunteer.save()
  res.status(201).json(newVolunteer)
  
  } catch(error) {
    res.status(400).json({message:error.message})
  }
  }

  //Get comments from volunteer
  
  exports.getVolunteerComments = async (req, res) => {
    req.volunteer = await Volunteer.findById(req.params.id);
    let volunteer = req.volunteer;
    res.send(volunteer.comments);

  };

  exports.addVolunteerComment = async (req, res) => {
     let comment = await createComment({author : req.user._id, content: req.body.content});
     await Volunteer.findOneAndUpdate(
        { _id: req.params.id}, 
        { $push: { comments: comment } })
    res.status(200).json(comment)
  }

  exports.deleteVolunteerComment = async (req, res) => { 

    try {
     await deleteComment({id : req.params.commentId}).catch(err => {
        throw err;
      }); 
     await Volunteer.findOne( { _id: req.params.id}).then(volunteer => {
       volunteer.comments.pull(req.params.commentId)
       volunteer.save()
     });

    } catch (error) {
      return res.send(error.message);
    }

    return res.status(201).json({ message: 'Komentarz usunięty!'});
  }


  //get events from volunteer. 
  
  exports.getVolunteerEvents = async (req, res) => {
    let volunteersEvents;
    volunteersEvents = await Volunteer.findById(req.params.id);
    res.send(volunteersEvents.events);

  };

  // Add rate to volunteer

  exports.addVolunteerRate = async (req, res) => {
    let rate = await createRate({ rate: req.body.rate});
    
   let volunteer= await Volunteer.findOneAndUpdate(
       { _id: req.params.id}, 
       { $push: { rate: rate } },
      )
     
   res.status(200).json(rate)

volunteerRates= await Volunteer.findById(req.params.id)
    .populate('rate');

    let rates=volunteerRates.rate;

    let sum=0;
    let count=0;
    rates.forEach(element => {
     sum=sum+element.rate 
     count++;
    });

    let average= (sum/count).toFixed(2) 

    let volunteerAverage= await Volunteer.findOneAndUpdate(
      { _id: req.params.id}, 
      {averageRate:average}
     )
  
 };

 // get volunteers count

 exports.getVolunteersCount = async (req, res) => {
    const volunteersCount = await Volunteer.find().count();
    return res.send({ volunteers: volunteersCount });
 };