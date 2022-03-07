const Comment = require('../Models/commentsModel');
const Volunteer = require('../Models/VolunteerModel');


// Get one comment
exports.getOneComment= async (req,res)=>{
    let commentById
    try {
      commentById= await Comment.findById(req.params.id)
      if(commentById == null){
        throw new Error ('Nie ma takiego komentarza')
      }
    } catch(error){
      return res.status(500).json({message:error.message})
    }
    res.commentById=commentById
    res.send(commentById)
  }
  
  
    //PUT comment -> patch (tylko do tych danych co się zmieniły)
    exports.updateComment = async (req, res) => {
    try {
      const updatedComment = await Comment
        .findOneAndUpdate(
          {_id: req.params.id},
          {
           content: req.body.content,
           date: Date.now()
          },
          { new: true }
        )
        .exec()
        console.log(updatedComment)
  
      if (!updatedComment) {
      throw new Error (' Nie ma takiego komentarza')
      }
      res.status(200).json({ data: updatedComment })
    } catch (error) {
      console.error(e)
      res.status(400).send({message:error.message})
    }
  };
  
  
    // POST comment
  
    exports.createComment = async (req, res)=>{
      try{
      const volunteer= await Volunteer.findById(req.params.id)
           const comment = new Comment({
       author: req.user,
       content:  req.body.content,
       date: Date.now(),
          })
    const newComment=await comment.save()
    console.log(volunteer.comments)
    volunteer.comments=volunteer.comments.push(newComment);
    console.log(volunteer.comments)
    res.status(201).json(newComment)
    } catch(error) {
      res.status(400).json({message:error.message})
    }
    }

    //delete comment

    exports.deleteComment = async (req, res) => {
        try {
          const deletedComment = await Comment
            .findByIdAndRemove(
              {_id: req.params.id}
            )
            .exec()
      
          if (!deletedComment) {
            throw new Error (' Nie ma takiego komentarza')
          }
          res.status(200).json({ data: deletedComment })
        } catch (error) {
          console.error(error)
          res.status(400).send({message:error.message})
        }
      };