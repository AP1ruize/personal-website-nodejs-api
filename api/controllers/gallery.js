const mongoose=require("mongoose")
const Image = require("../models/image")
const fs=require("fs")

exports.get_all_images = (req, res, next) => {
    Image.find({private: false}).select("_id name date uploadDate desc uploaderId private img").exec()
    .then(docs => {
        // const response = {
        //     count: docs.length,
        //     products: docs.map(doc => {
        //         return {
        //             _id: doc._id,
        //             name: doc.name,
        //             date: doc.date,
        //             uploadDate: doc.uploadDate,
        //             desc: doc.desc,
        //             img: req.file.path,
        //             request: {
        //                 type: 'GET',
        //                 url: 'http://localhost:3000/api/v2/gallery/public/' + doc._id
        //             }
        //         };
        //     })
        // };
        // console.log(json(response));
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({ error: err});
    })
};

exports.get_an_image = (req, res, next) => {
    const photoID = req.params.photoId;
    // console.log(photoID);
    Image.findById(photoID).exec().then(doc => {
        if(doc.private){
            res.status(401).json({message: "Auth failed"});
        }
        else{
            res.status(200).json({
                _id: doc._id,
                name: doc.name,
                date: doc.date,
                uploadDate: doc.uploadDate,
                desc: doc.desc,
                uploaderId: doc.uploaderId,
                private: doc.private,
                img: doc.img,
            });
        }
    }).catch(err => {
        res.status(500).json({error: err});
    })
};

exports.update_an_img_info = (req, res, next) => {
    const photoID = req.params.photoId;
    const userId=req.userData.userId;
    try{
        Image.findById(photoID).exec().then(result=>{
            let uploader_id = result.uploaderId;
            if(userId!=uploader_id){
                res.status(401).json({message: "Auth failed"})
                return;
            }
            else{
                Image.updateOne({_id: photoID}, {$set: req.body}).exec().then(result => {
                    res.status(200).json({
                        message: 'Update the photo successfully',
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/v2/gallery/public/' + photoID
                        }
                    });
                })
            }
        });
        
    } catch(err) {
        res.status(500).json({error: err});
    }
};

exports.delete_an_img = (req, res, next) => {
    try{
        const photoID = req.params.photoId;
        const userId=req.userData.userId;
        let filePath="";
        
        Image.findById(photoID).exec().then(result => {
            // console.log("get result")
            // console.log(result)
            // console.log(photoID)
            if(result===null){
                // console.log("result=null")
                // error=true;
                res.status(400).json({message: "Image not existed"});
                // console.log("after res");
                return;
            }
            else {
                // console.log("result!=null")
                let uploader_id = result.uploaderId;
                if(userId!=uploader_id){
                    res.status(401).json({message: "Auth failed"})
                    return;
                }
                filePath=result.img;
                // console.log(filePath);
                fs.unlinkSync(filePath);
                Image.deleteOne({_id: photoID}).exec()
                .then(result => {
                res.status(200).json({
                    message: "Delete the photo successfully",
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/api/v2/gallery/public/new',
                        body: { name: 'String', date: 'String', desc: 'String'}
                    }
                });
                })
            }
        })

    } catch(err){
        // console.log("caught error")
        res.status(500).json({error: err});
    }
};


exports.upload_an_image = (req, res, next) => {
    let photoDate = new Date(req.body.date);
    // console.log(req.file);
    const image = Image({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        date: photoDate,
        uploadDate: new Date().toISOString(),
        desc: req.body.desc,
        uploaderId: req.userData.userId,
        private: false,
        img: req.file.path
    });

    image.save().then(result => {
        res.status(200).json({
            message: 'Upload a photo sucessfully',
            uploadedPhotoInfo: {
                _id: result._id,
                name: result.name,
                date: result.date,
                uploadDate: result.uploadDate,
                desc: result.desc,
                uploaderId: result.uploaderId,
                private: result.private,
                img: req.file.path,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v2/gallery/public/' + result._id
                }
            }
        });
    }).catch(err => {
        res.status(500).json({error: err});
    })

};

exports.upload_an_pvt_img = (req, res, next) => {
    let photoDate = new Date(req.body.date);
    // console.log(req.file);
    const image = Image({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        date: photoDate,
        uploadDate: new Date().toISOString(),
        desc: req.body.desc,
        uploaderId: req.userData.userId,
        private: true,
        img: req.file.path
    });

    image.save().then(result => {
        res.status(200).json({
            message: 'Upload a photo sucessfully',
            uploadedPhotoInfo: {
                _id: result._id,
                name: result.name,
                date: result.date,
                uploadDate: result.uploadDate,
                desc: result.desc,
                uploaderId: result.uploaderId,
                private: result.private,
                img: req.file.path,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v2/gallery/public/' + result._id
                }
            }
        });
    }).catch(err => {
        res.status(500).json({error: err});
    })

};

exports.get_an_pvt_img = (req, res, next) => {
    const photoID = req.params.photoId;
    // console.log(photoID);
    Image.findById(photoID).exec().then(doc => {
        if(doc.private && doc.uploaderId!=req.userData.userId){
            res.status(401).json({message: "Auth failed"});
        }
        else{
            res.status(200).json({
                _id: doc._id,
                name: doc.name,
                date: doc.date,
                uploadDate: doc.uploadDate,
                desc: doc.desc,
                uploaderId: doc.uploaderId,
                private: doc.private,
                img: doc.img,
            });
        }
    }).catch(err => {
        res.status(500).json({error: err});
    })
};

exports.get_all_my_img = (req, res, next) => {
    const userId=req.userData.userId;
    // console.log(userId);
    Image.find({uploaderId: userId}).select("_id name date uploadDate desc uploaderId private img").exec()
    .then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({ error: err});
    })
};

exports.get_all_my_pub_img = (req, res, next) => {
    const userId=req.userData.userId;
    // console.log(userId);
    Image.find({uploaderId: userId, private: false}).select("_id name date uploadDate desc uploaderId private img").exec()
    .then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({ error: err});
    })
};

exports.get_all_my_pvt_img = (req, res, next) => {
    const userId=req.userData.userId;
    // console.log(userId);
    Image.find({uploaderId: userId, private: true}).select("_id name date uploadDate desc uploaderId private img").exec()
    .then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({ error: err});
    })
};