const mongoose = require('mongoose');
const Category = require('../Models/categoriesModel')


// Get one category
exports.getOneCategory= async (req,res)=>{
  let categoryById
  try {
    categoryById= await Category.findById(req.params.id)
    if(categoryById == null){
      throw new Error ('Nie ma takiej kategorii')
    }
  } catch(error){
    return res.status(500).json({message:error.message})
  }
  res.categoryById=categoryById
  res.send(categoryById)
}

//GET all categories
exports.allCategories = async (req, res, next) => {
    results.results = await Category.find(req.query || req.params);
    res.send({
      Category: results,
    });
  };

  // POST category

  exports.createCategory = async (req, res)=>{
    try{
    const category = new Category({
     name:  req.body.name,
     color: req.body.color,
     icon: req.body.icon
    })

  const newCategory=await category.save()
  console.log(newCategory)
  res.status(201).json(newCategory)
  } catch(error) {
    res.status(400).json({message:error.message})
  }
  }


  