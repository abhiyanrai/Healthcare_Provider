const mongoose = require("mongoose");

const visitDetailSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
  dailyNote: String,
  date: String,
  functional: {
    Adams: { 
        FixedSI: { position: { left: Boolean, right: Boolean }, BLT: Boolean },
        Free: { position: { left: Boolean, right: Boolean }, BLT: Boolean },
        Lumb: { position: { left: Boolean, right: Boolean }, Deg: String, Neg: Boolean },
        Thor: { position: { left: Boolean, right: Boolean }, Deg: String, Neg: Boolean },
    },
    Crom: { 
        EXT: { Dec: Boolean, Inc: Boolean, Normal: Boolean, Deg: String },
        FLX: { Dec: Boolean, Inc: Boolean, Normal: Boolean, Deg: String },
        LLB: { Dec: Boolean, Inc: Boolean, Normal: Boolean, Deg: String },
        LROT: { Dec: Boolean, Inc: Boolean, Normal: Boolean, Deg: String },
        PROT: { Dec: Boolean, Inc: Boolean, Normal: Boolean, Deg: String },
        RLB: { Dec: Boolean, Inc: Boolean, Normal: Boolean, Deg: String },
    },
    Listings: { L1: String, L2: String, L3: String },
    Notes: String,
    SI: { low: Boolean, position: { left: Boolean, right: Boolean }, cm: String },
    ProneCrest: { height: Boolean, position: { left: Boolean, right: Boolean }, cm: String },
    TMJ: { step1: String, step2: String, step3: String }, 
    shoulderForm: [
        { testName: String, left: String, right: String, Rn: Boolean, Pn: Boolean }
    ] 
  },
  treatments: {
    shoulderOption:[{left:String, leftValue:String, right:String, rightValue:String}],
    adjacent:Boolean,
    Scoliosis:Boolean,
    Distraction:Boolean,
    exam:Boolean,
    DC:{ name:String, cervical:String, lumber:String, thoracic:String, extermity:String },
    HP:{ name:String, cervical:String, lumber:String, thoracic:String, extermity:String },
    Kinesiotaping:{
      name:{ tspine:Boolean, lspine:Boolean, both:Boolean },
      kinesiotapingPosition: [{ left:String, right:String }],
      treatmentPlan:{ asNeed:String, time:Boolean },
      treatmentFrequency:{treatmentLeft:String, frequency:String, treatmentRight: String, duration:String },
      nextAppointments:{ first:String, second:String, third:String }
    }
  },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "appointment" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
  examinationId: { type: mongoose.Schema.Types.ObjectId, ref: "examination" },
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: "consultation"},
  isDeleted: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const visitDetail = mongoose.model("visitDetail", visitDetailSchema);

module.exports = visitDetail;