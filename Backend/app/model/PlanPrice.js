const mongoose = require("mongoose");

const planPriceSchema = new mongoose.Schema({
  planId: {type:mongoose.Schema.Types.ObjectId, ref: "plan"},
  price: String,
  stripePriceId: String,
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const PlanPrice = mongoose.model("planPrice", planPriceSchema);

module.exports = PlanPrice;