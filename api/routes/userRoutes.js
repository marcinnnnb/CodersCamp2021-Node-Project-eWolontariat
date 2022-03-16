const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/userMiddleware');
const { upload } = require("../middleware/pictureMiddleware");

router.get('/:id', userController.getUser);
router.post('/register', userController.registration);
router.post('/login', userController.logging);
router.get('/login/:login', userController.getLoggedInUser);
router.patch('/:id',auth.loggedUser, upload.single('image'), userController.updatedUser);

module.exports = router;