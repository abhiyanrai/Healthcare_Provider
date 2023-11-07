const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    roomName: String,
    isActive: { type: Boolean, required: true, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const Room = mongoose.model('room', roomSchema)

module.exports = Room;
