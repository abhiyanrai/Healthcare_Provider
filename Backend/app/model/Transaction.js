const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  responseJSON: {type: mongoose.Schema.Types.Mixed}, 
  status: {type: String, required: true, default: "pending"},// pending, success, failed 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "userSubscription" },
  isDeleted: { type: Boolean, required: true, default: false },
  planName: String
}, { timestamps: true });

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction; 