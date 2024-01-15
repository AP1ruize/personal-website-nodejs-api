// import express from "express"
// import mongoose from "mongoose";
// import Image from "../../models/image.js"
const express =require("express")
const mongoose=require("mongoose")
const Image = require("../../models/image");

// import bodyParser from "body-parser";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);


// import imageSchema from "../models/image.js"
// router.use(express.urlencoded());
// router.use(express.json());
const router =  express.Router();

router.get('/public', (req, res, next) => {
    Image.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/public/new', (req, res, next) => {
    console.log(req.body);
    var photoDate = Date(req.body.date); // some problems
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        date: photoDate,
        desc: req.body.desc
    })

    image.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(200).json(
        {
            message: "upload success",
            imageInfo: image
        }
    )
});

router.get('/public/:photoId', (req, res, next) => {
    const photoID = req.params.photoId;
    Image.findById(photoID)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
});

// update
router.patch('/public/:photoId', (req, res, next) => {
    const photoID = req.params.photoId;
    // var photoDate = Date(req.body.date); // some problems
    console.log(req.body);
    // const updateOps = {};
    // for(const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    // in this case, req.body should be like this: [{propName: "...", value: "..."}]
    // Image.update({_id: photoID}, { $set: updateOps }).exec()
    Image.updateOne({_id: photoID}, { $set: req.body }).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.delete('/public/:photoId', (req, res, next) => {
    const photoID = req.params.photoId;
    // Image.remove({_id: photoID}).exec()
    Image.deleteOne({_id: photoID}).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err: error});
    });
});


module.exports=router;
// export default router;