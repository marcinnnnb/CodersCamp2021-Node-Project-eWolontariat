const express = require('express');
const router = express.Router();
const CategoriesController= require('../controllers/categoriesControllers')
// const Volunteerauth = require('../middleware/VolunteerMiddleware')

//getting one
router.get('/:id', CategoriesController.getOneCategory);
//get all categories
router.get('/', CategoriesController.allCategories);

//creating 
router.post ('/', CategoriesController.createCategory);

module.exports=router