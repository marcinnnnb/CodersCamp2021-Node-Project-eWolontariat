const mongoose = require('mongoose');
const Volunteer = require('../models/VolunteerModel');
const url= require('url');



// Get one volunteer
exports.getOneVolunteer= async (req,res)=>{
  let volunteerById
  try {
    volunteerById= await Volunteer.findById(req.params.id)
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
  let volunteers;
   
  try{    

  if(!queryObject.categories) {
    volunteers= await Volunteer.aggregate().populate('categories').exec();
  } else {
    volunteers = await Volunteer.find().populate({
      path: 'categories',
      match: {
        type: queryObject.categories
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
      .findOneAndUpdate(
        {_id: req.params.id},
        {
         categories: req.body.categories,
         description: req.body.description
        },
        { new: true }
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
    const volunteer = new Volunteer({
     user:req.user,
     categories:  req.body.categories,
     description: req.body.description
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

  //get events from volunteer. 
  
  exports.getVolunteerEvents = async (req, res) => {
    let volunteersEvents;
    volunteersEvents = await Volunteer.findById(req.params.id);
    res.send(volunteersEvents.events);
 
  };