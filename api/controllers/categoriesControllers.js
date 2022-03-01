const mongoose = require('mongoose');
const Category = require('../Models/categoriesModel')


// Get one category
exports.getOneCategory= async (req,res)=>{
  let categoryById
  try {
    categoryById= await Category.findById(req.params.id)
    if(categoryById == null){
      return res.status(404).json({message:'Nie ma takiej kategorii'})
    }
  } catch(err){
    return res.status(500).json({message:err.message})
  }
  res.categoryById=categoryById
  res.send(categoryById)
}

//GET all categories
exports.allCategories = async (req, res, next) => {
    const results = {
      allCategories: await Category.count(),
    };
    results.results = await Category.find(req.query || req.params);
    res.send({
      request: {
        type: 'GET',
      },
      Category: results,
    });
  };

  // POST category

  exports.createCategory = async (req, res)=>{
    try{
    const category = new Category({
     categories:  req.body.categories,
    })
    // category.save().then(()=> {
    //   console.log(category)
    // })
  const newCategory=await category.save()
  console.log(newCategory)
  res.status(201).json(newCategory)
  } catch(err) {
    res.status(400).json({message:err.message})
  }
  }