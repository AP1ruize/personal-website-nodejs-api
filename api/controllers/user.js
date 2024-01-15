const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const mongoose = require("mongoose")
// const express = require("express")
const User = require("../models/user")


exports.userSignup = (req,res, next) => {

    User.find({email: req.body.email}).exec().then(user => {
        if(user.length>=1){
            return res.status(409).json({message: "Mail exists"});
        }
        else {
            let hash = bcrypt.hashSync(req.body.password, 10);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            // console.log("user created");
            user.save()
                .then(result => {
                    // console.log(result);
                    res.status(201).json({ message: 'User created'});
                }).catch (err => {
                    // console.log(err);
                    res.status(500).json({error: err});
                });
        }
    }).catch (err => {
        // console.log(err);
        res.status(500).json({error: err});
    });

};

exports.userLogin = (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if(user.length<1){
            return res.status(401).json({message: "Auth failed, received wrong data format"});
        } 
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({message: "Auth failed, didn't match"});
            }
            if(result){
                let token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, "secret",
                {
                    expiresIn: "2h"
                });
                return res.status(200).json({
                    message: "Auth successful",
                    userInfo: {
                        id: user[0]._id,
                        email: user[0].email,
                        token: token
                    }
                });
            }
            else {return res.status(401).json({message: "Auth failed"});}
        })
    }).catch (err => {
        // console.log(err);
        res.status(500).json({error: err});
    });
};