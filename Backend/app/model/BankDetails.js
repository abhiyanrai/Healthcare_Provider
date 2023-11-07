const mongoose = require("mongoose")

const BankDetails = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "clinicDetails"},
    currency: { type: String, default: "" },
    bankName: { type: String, default: "" },
    bankCode: { type: String, default: "" },
    accountNo: { type: String, default: "" },
    swiftCode: { type: String, default: "" },
    sortCode: { type: String, default: "" },
    isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true })

const Bank = mongoose.model('bankDetails', BankDetails)

module.exports = Bank;