const Picture = require("../models/pictureModel");
const fs = require('fs');
const path = require('path');

exports.getPictureById = async (req, res) => {
    req.picture = await Picture.findById(req.params.id); 
    let picture = req.picture;
    res.send(picture.img.data.toString('base64'));
};

exports.loadPicture = async (req, res) => {
    if (req.file){
    const picture = await new Picture({
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: req.file.buffer
        }
    });
    Picture.create(picture, (err, item) => {
        if (err) {
                res.status(400).json({
                  error: error
                });
        }
        else {
            item.save();
            res.status(201).json({
                message: 'Picture saved successfully!'
              });
        }
    })
    } 
    else {
        res.status(400).send({ message: "Image has not been loaded" });
    }
    
};

exports.deletePicture = async (req, res) => {
    try{
      req.picture = await Picture.findByIdAndDelete(req.params.id); 
      res.status(201).json({
        message: 'Picture deleted!'
      });
    } catch {
        (error) => {
            res.status(400).json({
              error: error
            });
        }
    }
}