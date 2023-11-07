const mongoose = require("mongoose");

const dropdownModelSchema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const DropDownModel = mongoose.model("dropdownModel", dropdownModelSchema);

module.exports = DropDownModel;