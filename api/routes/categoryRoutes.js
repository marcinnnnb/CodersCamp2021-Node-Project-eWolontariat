const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.saveNewCategory);

module.exports = router;