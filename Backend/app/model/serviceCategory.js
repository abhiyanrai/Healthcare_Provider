const mongoose = require("mongoose")

const serviceCategorySchema = new mongoose.Schema({
    name: String,
    isDeleted: { type: Boolean, required: true, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const serviceCategory = mongoose.model('serviceCategory', serviceCategorySchema)

module.exports = serviceCategory;   