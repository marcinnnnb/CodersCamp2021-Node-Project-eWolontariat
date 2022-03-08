const multer = require('multer');
const jwt = require('jsonwebtoken');
const Picture = require('../models/pictureModel');
  
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpg" )  {
    cb(null, true);
  } else {
    cb(new Error("Not a jpg/png File!!"), false);
  }
};
  
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.upload = upload;


exports.isLoggedUser = async (req, res, next) => {
    const token = req.header('auth-token');

    try {

       if (!token) {
         res.status(401);
         throw new Error ('Access Denied. You have to log in!');
        }

       const event = await Picture.findById(req.params.id).catch((err)=> 
       {
          res.status(404);
          throw new Error('There is no picture with this ID');
        });

       jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {

        if(err) {
            console.error(err);
            res.status(404);
            throw new Error ('Invalid token');
        } else {
            req.user = decoded;
        }
        
    });

    if (req.params.id && req.method === "DELETE") {
      const picture = await Picture.findById(req.params.id).catch((err)=> 
        {
          res.status(404);
          throw new Error('There is no picture with this ID');
        });

      if(!picture) {
          res.status(404);
          throw new Error("No picture found!");
      };
  
      if(req.user._id !== picture.owner.toString()) {
          res.status(403);
          throw new Error("You can`t delete this picture. You are not the owner.");
      };
    }
       next();
    }
    catch (error) {
        res.json({error: error.message});
    }
    
};