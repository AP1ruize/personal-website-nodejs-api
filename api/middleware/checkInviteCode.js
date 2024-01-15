const mongoose = require("mongoose")
const InviteCode = require("../models/inviteCode")

module.exports= (req, res, next) => {
    try{
        InviteCode.find({code: req.body.code}).exec().then(inviteCode =>{
            if(inviteCode.length<1){
                return res.status(401).json({message: "Auth failed, received wrong invite code."});
            }
            // invite code exists, check remain times
            // if =1, delete the code
            if(inviteCode[0].times<1.1){
                InviteCode.deleteOne({_id: inviteCode[0]._id}).exec();
            } else {
                // times -1
                var newTimes=inviteCode[0].times -1;
                InviteCode.updateOne({_id: inviteCode[0]._id}, {times: newTimes}).exec();
            }
            next();
        })
    }catch(error){res.status(500).json({error: err});}
}