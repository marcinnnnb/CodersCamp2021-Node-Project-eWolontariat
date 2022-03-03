const multer = require('multer');
  
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