const Category = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find().exec();
  res.send({ categories: categories });
}

exports.saveNewCategory = async (req, res) => {
  let category= new Category(
      {
          name: req.body.name,
          color: req.body.color,
          icon: req.body.icon
      }
  );
  req.category = category;

  category = await category.save().then(
    () => {
      res.status(201).json({
        message: 'Category saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};