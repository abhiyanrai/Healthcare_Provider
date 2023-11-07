const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, required: true, default: "active" },
  validTill: String,
  planPriceId: {type:mongoose.Schema.Types.ObjectId, ref: "planPrice"},
  stripePriceId: String,
  stripeProductId: String,
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const Plan = mongoose.model("plan", planSchema);

module.exports = Plan;