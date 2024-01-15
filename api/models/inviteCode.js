const mongoose = require("mongoose")

const inviteCodeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {type: String, required:true, unique: true},
    times: {type: Number, required: true}
});

module.exports = mongoose.model('InviteCode', inviteCodeSchema);