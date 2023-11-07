const mongoose = require("mongoose");

const userSubscriptionSchema = new mongoose.Schema({
  responseJSON: {type: mongoose.Schema.Types.Mixed},
  endDate: {type: Date, required: true, default: new Date(+new Date() + 30*24*60*60*1000) },
  startDate: {type: Date, required: true, default: new Date()},
  subscriptionStatus: {type: String, required: true, default: "trial"},// trail, subscribed, expired
  noOfHealthCareProvider: {type: Number, required: true, default: 1},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  planTotalPrice: Number,
  customerId: {type: String, required: true},
  isDeleted: { type: Boolean, required: true, default: false },
  paymentCount: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const UserSubscription = mongoose.model("userSubscription", userSubscriptionSchema);

module.exports = UserSubscription;

