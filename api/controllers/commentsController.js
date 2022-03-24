const Comment = require('../models/commentsModel')

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
  
    exports.createComment = async (body)=>{
      try{
      const comment = new Comment({
       author: body.author,
       content: body.content,
       date: Date.now(),
          })
    const newComment=await comment.save()
         return newComment;
    } catch(error) {
      throw new Error(error);
    }
    }

    //delete comment

    exports.deleteComment = async (body) => {

      try {
        const deletedComment = await Comment
          .findByIdAndRemove(
            {_id: body.id}
          )
          .exec()

        if (!deletedComment) {
          throw new Error (' Nie ma takiego komentarza')
        }

      } catch (error) {
        throw error;
      }
    };