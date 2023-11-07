const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  gender: String,
  dob: String,
  registrationDate: String,
  salutation: { type: String },
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String },
  contactNo: { type: String },
  address: { type: String },
  zipcode: { type: String },
  reference: { type: String },
  trackPatient: Object,
  city: String,
  fileNo: { type: String,  default: null},
  isNewPatient: { type: Boolean, required: true, default: true },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;