const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/pictureController');
const { upload } = require("../middleware/pictureMiddleware");
const auth = require("../middleware/pictureMiddleware");

router.get('/:id', auth.isLoggedUser, PictureController.getPictureById);
router.post('/', auth.isLoggedUser, upload.single('image'), PictureController.loadPicture);
router.delete('/:id', auth.isLoggedUser, PictureController.deletePicture);

module.exports = router;