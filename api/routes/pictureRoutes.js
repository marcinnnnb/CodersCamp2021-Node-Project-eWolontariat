const express = require('express');
const router = express.Router();
const PictureController = require('../controllers/pictureController');
const { upload } = require("../middleware/pictureMiddleware");

router.get('/:id', PictureController.getPictureById);
router.post('/', upload.single('image'), PictureController.loadPicture);
router.delete('/:id', PictureController.deletePicture);

module.exports = router;