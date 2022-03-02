const mongoose = require('mongoose');
const Volunteer = require('../Models/VolunteerForm')


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
     categories:  req.body.categories,
     description: req.body.description
    })
    // volunteer.save().then(()=> {
    //   console.log(volunteer)
    // })
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
    // filterVolunteer= await Volunteer.find({Category})
    filterVolunteer= db.volunteers.find({categories})
    if(filterVolunteer === null){
      // return res.status(404).json({message:'Nie ma wolontariuszy w tej kategorii'})
      return res.send(volunteer)
    }
  } catch(err){
    return res.status(500).json({message:err.message})
  }
  res.filterVolunteer=filterVolunteer
  res.send(filterVolunteer)
}

  //Get comments from volunteer

  //get Events from volunteer. 