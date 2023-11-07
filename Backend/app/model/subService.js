const mongoose = require("mongoose")

const subServiceSchema = new mongoose.Schema({
    subServiceName: String,
    amount: Number,
    tax: [
        {
            name: String,
            value: Number,
        },
    ],
    isActive: { type: Boolean, required: true, default: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "service" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })

const SubService = mongoose.model('subService', subServiceSchema);


module.exports = SubService;