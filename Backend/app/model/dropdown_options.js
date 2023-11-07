const mongoose = require("mongoose");

const dropdownOptionSchema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, required: true, default: false },
  modelId:  { type: mongoose.Schema.Types.ObjectId, ref: "dropdownModel" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }  
}, { timestamps: true });

const DropDownOption = mongoose.model("dropdownOption", dropdownOptionSchema);

module.exports = DropDownOption;