const Comment = require('../Models/commentsModel')

// Get one comment
exports.getOneComment= async (req,res)=>{
    let commentById
    try {
      commentById= await Comment.findById(req.params.id)
      if(commentById == null){
        return res.status(404).json({message:'Nie ma takiego komentarza'})
      }
    } catch(err){
      return res.status(500).json({message:err.message})
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
        return res.status(400).send(' Nie ma takiego komentarza')
      }
      res.status(200).json({ data: updatedComment })
    } catch (e) {
      console.error(e)
      res.status(400).send('Error')
    }
  };
  
  
    // POST comment
  
    exports.createComment = async (req, res)=>{
      try{
      const comment = new Comment({
       author: User.firstName,
       content:  req.body.content,
       date: Date.now()
       
      })
      // comment.save().then(()=> {
      //   console.log(comment)
      // })
    const newComment=await comment.save()
    console.log(newComment)
    res.status(201).json(newComment)
    } catch(err) {
      res.status(400).json({message:err.message})
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
            console.log(deletedComment)
      
          if (!deletedComment) {
            return res.status(400).send(' Nie ma takiego komentarza')
          }
          res.status(200).json({ data: deletedComment })
        } catch (e) {
          console.error(e)
          res.status(400).send('Error')
        }
      };