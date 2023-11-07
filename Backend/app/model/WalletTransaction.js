const mongoose = require("mongoose");
const moment = require("moment")

const walletTransactionSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "wallet" },
  billingId: { type: mongoose.Schema.Types.ObjectId, ref: "patientBilling"},
  paymentMode: String,
  paymentDate: { type: String, default: moment(Date.now()).format("YYYY-MM-DD") },
  status: { type: String, enum: ["advancedPaid", "paid", "unpaid", "cancelled"] },
}, { timestamps: true }); 

const WalletTransaction = mongoose.model("patientTransaction", walletTransactionSchema);

module.exports = WalletTransaction;