const mongoose = require('mongoose');
const Volunteer = require('../Models/VolunteerModel')


// Get one volunteer
exports.getOneVolunteer= async (req,res)=>{
  let volunteerById
  try {
    volunteerById= await Volunteer.findById(req.params.id)
    if(volunteerById == null){
      return res.status(404).json({message:'Nie ma takiego wolontariusza'})
    }
  } catch(err){
    return res.status(500).json({message:err.message})
  }
  res.volunteerById=volunteerById
  res.send(volunteerById)
}

//GET all volunteers
exports.allVolunteers = async (req, res, next) => {
  results = await Volunteer.find(req.query || req.params);
  res.send({
    Volunteer: results,
  });
};

  //PUT volunteer -> patch (tylko do tych danych co się zmieniły)
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
      .exec()
      console.log(updatedVolunteer)

    if (!updatedVolunteer) {
      return res.status(400).send(' Nie ma takiego wolontariusza')
    }
    res.status(200).json({ data: updatedVolunteer })
  } catch (e) {
    console.error(e)
    res.status(400).send('Error')
  }
};


  // POST volunteer

  exports.createVolunteer = async (req, res)=>{
    try{
    const volunteer = new Volunteer({
    //  user:req.body.user,
     categories:  req.body.categories,
     description: req.body.description
    })
  const newVolunteer=await volunteer.save()
  console.log(newVolunteer)
  res.status(201).json(newVolunteer)
  } catch(err) {
    res.status(400).json({message:err.message})
  }
  }

  //Sort by category

  exports.filterByCategory= async (req,res)=> {
    let filterVolunteer
  try {
    filterVolunteer= await Volunteer.find({categories: req.params.categoryId})
    
    if(filterVolunteer === null){
      return res.status(404).json({message:'Nie ma wolontariuszy w tej kategorii'})
      
    }
  } catch(err){
    return res.status(500).json({message:err.message})
  }
  res.filterVolunteer=filterVolunteer
  res.send(filterVolunteer)
}


  //Get comments from volunteer
  
  exports.getVolunteerComments = async (req, res) => {
    req.volunteer = await Volunteer.findById(req.params.id);
    let volunteer = req.volunteer;
    res.send(volunteer.comments);
  };
  //get Volunteers from volunteer. 
  
  exports.getVolunteerEvents = async (req, res) => {
    let volunteersEvents;
    volunteersEvents = await Volunteer.findById(req.params.id);
    res.send(volunteersEvents.events);
  };