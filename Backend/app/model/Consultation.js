const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  date: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const Consultation = mongoose.model("consultation", consultationSchema);

module.exports = Consultation;
                                                            
                                                                   
