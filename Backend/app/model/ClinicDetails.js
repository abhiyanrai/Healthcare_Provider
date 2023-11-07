const mongoose = require("mongoose")

const ClinicDetails = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    clinicName: { type: String, default: ""},
    speciality: { type: String, default: "" },
    clinicAddress: { type: String, default: "" },
    clinicEmail: { type: String, default: "" },
    website: { type: String, default: "" },
    clinicNumber: { type: String, default: ""},
    clinicPic: { type: String, default: "" },
    isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true })

const Clinic = mongoose.model('clinicDetails', ClinicDetails)

module.exports = Clinic;
