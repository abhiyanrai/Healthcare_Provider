const mongoose = require("mongoose");

const patientBillingSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //Mandatory
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" }, //Mandatory
    serviceDate: String,    
    paymentDetails: String,
    totalAmount: Number,
    discountApplied: Number,    
    billAmount: Number,
    paidAmount: Number,
    walletAmount: Number,
    orderJson: [Object],
    paymentMode: String,
    invoiceNumber: String,
    isCancelled: { type: Boolean, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Billing = mongoose.model("patientBilling", patientBillingSchema);

module.exports = Billing;