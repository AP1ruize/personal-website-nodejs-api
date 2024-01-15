const mongoose = require("mongoose")
const InviteCode =require("../models/inviteCode");

exports.newInviteCode=(req,res,next)=>{
    InviteCode.find({code: req.body.code}).exec().then(inviteCode => {
        if(inviteCode.length>=1){
            return res.status(409).json({message: "Code exists"});
        }
        else {
            const newCode=new InviteCode({
                _id: new mongoose.Types.ObjectId(),
                code: req.body.code,
                times: req.body.times
            })
            newCode.save()
                .then(result => {
                    res.status(201).json({ message: 'Code created'});
                }).catch (err => {
                    res.status(500).json({error: err});
                });
        }
    }).catch (err => {
        // console.log(err);
        res.status(500).json({error: err});
    });
}

exports.showAllCodes=(req,res,next)=>{
    InviteCode.find().select("_id code times").exec()
    .then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        res.status(500).json({ error: err});
    })
}

exports.deleteACode=(req,res,next)=>{
    try{
        InviteCode.deleteOne({code: req.params.code}).exec();
        res.status(200).json({message: "Delete successfully."});
    }catch(error){res.status(500).json({error: err});}
}