const mongoose = require("mongoose");

const clinicScheduleSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    scheduleDetails: [
      {
        day: { type: String, required: true },
        schedule: [
          {
            startTime: String,
            endTime: String,
            isDeleted: { default: false },
          },
        ],
      },
    ],
    holidays: [
      {
        date: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const ClinicSchedule = mongoose.model("clinicSchedule", clinicScheduleSchema);

module.exports = ClinicSchedule;