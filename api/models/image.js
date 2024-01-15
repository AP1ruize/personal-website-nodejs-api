// import mongoose from "mongoose"
const mongoose=require("mongoose")

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    date: { type: Date, required: true },
    uploadDate: { type: Date, required: true },
    desc: { type: String, required: true },
    uploaderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    private: {type: Boolean, required: true},
    img: {type: String, required: true }
});
// const image = mongoose.model('Image', imageSchema);
// export default image;
module.exports = mongoose.model('Image', imageSchema);