const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//   patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
  date: String,
  symptom: String,
  radiates: String,
  describeSymptoms: String,
  duration: String,
  position: String,
  blt: String,
  begin:  String,
  ago: String,
  describeInjury: String,
  palliative: String,
  provocative: String,
  frequency: String,
  warnings: [Object],
  onSet: String,
  additionalNote: String,
  therapist: String,
  help: String,
  linkReports: [String],
  attachment: [String],
  goal: String,
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: "consultation" },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const Symptom = mongoose.model("symptom", symptomSchema);

module.exports = Symptom;