// import mongoose from 'mongoose';
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// const user = mongoose.model('User', userSchema);
// export default user;
module.exports = mongoose.model('User', userSchema);