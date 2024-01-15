// import express from "express";
// import mongoose from "mongoose";
// import User from "../../models/user.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"

// const bcrypt =require("bcrypt")
// const jwt =require("jsonwebtoken")
// const mongoose = require("mongoose")
const express = require("express")
// const User = require("../../models/user")
const UserController=require("../../controllers/user")
const checkInviteCode=require("../../middleware/checkInviteCode")

const router =express.Router();

router.post("/signup", checkInviteCode, UserController.userSignup);

router.post("/login", UserController.userLogin);

// export default router;
module.exports=router;