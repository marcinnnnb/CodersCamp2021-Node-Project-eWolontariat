const router = require('express').Router()
const userController = require('../controllers/user')
const auth = require('../middleware/authorization')
//const getUserId = require('../middleware/getUserId') nie działa tym sposobem 

router.get('/:id', auth.loggedUser, userController.getUser)
router.post('/register', userController.registration)
router.post('/login', userController.logging)
router.patch('/:id', auth.loggedUser, userController.updatedUser);
 

module.exports = router