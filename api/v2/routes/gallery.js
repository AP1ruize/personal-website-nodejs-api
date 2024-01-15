// import express from "express";
// import mongoose from "mongoose";
// import Image from "../../models/image.js";
// import fs from "fs";
// import multer from "multer"
const express =require("express")
// const mongoose=require("mongoose")
// const Image = require("../../models/image")

const multer=require("multer")
const GalleryController =require("../../controllers/gallery")
const checkAuth=require("../../middleware/checkAuth")

// import path from "path";
// import checkAuth from "../../middleware/checkAuth.js";
// import GalleryController from "../../controllers/gallery.js"

class FormatError extends Error{
    constructor(message) {
        super(message);
        this.name="FormatError";
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploadsPics');
    },
    filename: function(req, file, cb) {
        cb(null, (Date.now() + file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else cb(new FormatError("Image format errors."), false);
};
const uploadsPicsG = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 10},
    fileFilter: fileFilter
});


const router = express.Router();

router.get('/public/', GalleryController.get_all_images);

router.get('/public/:photoId', GalleryController.get_an_image);

router.post('/public/new', checkAuth, uploadsPicsG.single('img'), GalleryController.upload_an_image);

router.patch('/public/:photoId', checkAuth, GalleryController.update_an_img_info);

router.delete('/public/:photoId', checkAuth, GalleryController.delete_an_img);

// private sector


router.get('/private/allImg', checkAuth,GalleryController.get_all_my_img);

router.get('/private/allPub', checkAuth,GalleryController.get_all_my_pub_img);

router.get('/private/allPvt', checkAuth,GalleryController.get_all_my_pvt_img);

router.get('/private/:photoId', checkAuth, GalleryController.get_an_pvt_img);

router.post('/private/new', checkAuth, uploadsPicsG.single('img'), GalleryController.upload_an_pvt_img);




// export default router;
module.exports=router;