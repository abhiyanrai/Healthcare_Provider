const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    serviceName: String,
    serviceDescp: String,
    amount: { type: Number, default: 0 },
    subService: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subService' }], 
    categoryId:  { type: mongoose.Schema.Types.ObjectId, ref: "serviceCategory" },
    isActive: { type: Boolean, required: true, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const Service = mongoose.model('service', serviceSchema)

module.exports = Service;