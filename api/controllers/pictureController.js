const Picture = require("../models/pictureModel");
const User = require("../models/userModel");

exports.getPictureById = async (req, res) => {
    try{
        req.picture = await Picture.findById(req.params.id).catch(
            (error) => {
              res.status(400).json({
                error: 'There is no picture with this ID'
              });
            }
          );
        let picture = req.picture;
        if(picture){
            res.send(picture.img.data.toString('base64'));
        }
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

exports.loadPicture = async (req, res) => {
    if (req.file){
    const picture = await new Picture({
        name: req.body.name,
        desc: req.body.desc,
        owner: req.user,
        img: {
            data: req.file.buffer
        }
    });
    Picture.create(picture, (err, item) => {
        if (err) {
                res.status(400).json({
                  error: error
                });
        }
        else {
            User.findOneAndUpdate(
                { _id: req.user}, 
                { $push: { picture: item } }).catch(
                  (error) => {  
                    res.status(400).json({
                      error: 'There is no user with this ID'
                    });
                  }
                );
            
            item.save();
            res.status(201).json({
                message: `Picture id: ${picture.id} saved successfully!`
              });
        }
    })
    } 
    else {
        res.status(400).send({ message: "Image has not been loaded" });
    }
    
};

exports.deletePicture = async (req, res) => {
    try{
      req.picture = await Picture.findByIdAndDelete(req.params.id).catch(
        (error) => {
          res.status(400).json({
            error: 'There is no event with this ID'
          });
        }
      ); 
      console.log(req.picture)
      res.status(201).json({
        message: 'Picture deleted!'
      });
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}