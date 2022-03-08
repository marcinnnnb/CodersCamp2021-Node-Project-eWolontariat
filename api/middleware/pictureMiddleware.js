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
       if (!token) throw new Error ('Access Denied. You have to log in!');
       const event = await Picture.findById(req.params.id).catch((err)=> 
       {
            res.status(404)
            throw new Error('There is no picture with this ID');
        });
       jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if(err) {
            console.error(err);
            throw new Error ('Invalid token');
        } else {
            req.user = decoded;
        }
        
    });
       next();
    }
    catch (error) {
        res.status(401).json({error: error.message});
    }
    
};