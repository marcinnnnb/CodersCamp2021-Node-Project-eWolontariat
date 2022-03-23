const Picture = require("../models/pictureModel");
const User = require("../models/userModel");

exports.getPictureById = async (req, res) => {
    let picture;
    try{
        picture = await Picture.findById(req.params.id).catch(error=>{
            throw new Error('There is no picture with this ID');
          });
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
    
    return (
        res.setHeader('Content-Type','image/jpeg'),
        res.send(picture.img.data) )
};

exports.loadPicture = async (req, res) => {
    try {
        if (!req.file) throw new Error('Image has not been loaded');
            const picture = await new Picture({
                name: req.body.name,
                desc: req.body.desc,
                owner: req.user,
                img: {
                    data: req.file.buffer
                }
            });
            Picture.create(picture, (err, item) => {
                
                    User.findOneAndUpdate(
                        { _id: req.user}, 
                        { $push: { picture: item } }).catch(error=>{
                            throw new Error('There is no picture with this ID');
                          });
                    
                    item.save();
                    res.status(201).json({
                        message: `Picture saved successfully!`,
                        pictureId: picture.id
                      });
            }); 
            
    } catch(error) {
        return res.status(400).json({message: error.message})
    };
};

exports.deletePicture = async (req, res) => {
    try{
      req.picture = await Picture.findByIdAndDelete(req.params.id).catch(error=>{
        throw new Error('There is no picture with this ID');
      });
      
    } catch (error) {
        return res.status(400).send({message:error.message});
    };
    
    return res.status(201).json({ message: 'Picture deleted!' });
}