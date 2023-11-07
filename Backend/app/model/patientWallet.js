const mongoose = require("mongoose");

const patientWallet = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" }, //Mandatory
    walletAmount: { type: Number, required: true, default: 0 },
    isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Wallet = mongoose.model("wallet", patientWallet);

module.exports = Wallet;