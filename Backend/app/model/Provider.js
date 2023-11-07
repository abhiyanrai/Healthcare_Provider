const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    specialization: String,
    // experience: String,
    address: String,
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Provider = mongoose.model("provider", providerSchema);

module.exports = Provider;
