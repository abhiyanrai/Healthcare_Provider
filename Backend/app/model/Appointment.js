const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },  
  consultationId:  { type: mongoose.Schema.Types.ObjectId, ref: "consultation" },
  serviceId:  { type: mongoose.Schema.Types.ObjectId, ref: "service" },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
  startTime: String,
  endTime: String,
  duration: String,
  status: { type: String, required: true, default: "booked"},
  appointmentType: String,
  appointmentFreq: String,  
  reason: String,
  isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
                                    