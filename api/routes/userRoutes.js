const router = require('express').Router()
const userController = require('../controllers/userControllers')
const auth = require('../middleware/userMiddlewares')

router.get('/:id', userController.getUser)
router.post('/register', userController.registration)
router.post('/login', userController.logging)

router.patch('/:id',auth.loggedUser, userController.updatedUser);

 

module.exports = router