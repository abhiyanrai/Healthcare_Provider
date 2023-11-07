const mongoose = require("mongoose");

const examinationSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  // patientId: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: "consultation"},
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
    title: String,
    SI: { low: Boolean, position: { left: Boolean, right: Boolean }, cm: String },
    ProneCrest: { height: Boolean, position: { left: Boolean, right: Boolean }, cm: String },
    TMJ: { step1: String, step2: String, step3: String }, 
    shoulderForm: [
        { testName: String, left: String, right: String, Rn: Boolean, Pn: Boolean }
    ] 
  },
  orthopadic: {
    lumbarPos:Boolean,
    lunbarNag:Boolean,
    cervicalPos:Boolean,
    cervicalNag:Boolean,
    lumborOrtho: {
      EYl: { left: String, right: String, leftOption: { SI: Boolean, LB: Boolean, HIP: Boolean }, rightOption: { SI: Boolean, LB: Boolean, HIP: Boolean }},
      Nachlas: { left: String, right: String, leftOption: { SI: Boolean, LB: Boolean, HIP: Boolean }, rightOption: { SI: Boolean, LB: Boolean, HIP: Boolean }},
      Yeoman: { left: String, right: String, leftOption: { SI: Boolean, LB: Boolean, HIP: Boolean }, rightOption: { SI: Boolean, LB: Boolean, HIP: Boolean }},
      LaSeague: { left: String, right: String },
      Braggard: { left: String, right: String },
      FABERE: { left: String, right: String, leftOption: { SI: Boolean, LB: Boolean, HIP: Boolean }, rightOption: { SI: Boolean, LB: Boolean, HIP: Boolean }},
      Milgram: { left: String, right: String, leftOption: { SI: Boolean, LB: Boolean, HIP: Boolean }, rightOption: { SI: Boolean, LB: Boolean, HIP: Boolean }},
    },
    sottoHall: { thoracic: { left: String, right: String }, lumbar: { left: String, right: String }},
    deepTendon: {patellar:{left:{name:String,value:String},right:{name: String,value:String}},achills:{left:{name:String,value:String},right:{name:String,value:String}}},
    deepTendonReflexes: { biceps: { left: String, leftNew: String, right: String, rightNew: String }, triceps:{left: String, leftNew: String, right: String, rightNew: String} ,brachiorad:{left: String, leftNew: String, right: String, rightNew: String} },
    cervical:{jackson:String,dist:String, 
              MFC:{left:String ,right:String},
              DIST:{left:String,right:String},
              ShldrDep:{left:String,right:String},
              Wrights:{left:String,right:String},
              Scalene:{left:String,right:String},
              George:{left:String,right:String}   
            }
  },
  diagnoses: {
    additionalDxs: [ { name: String, value: String } ], 
    bone: [ { name: String, value: String } ],
    diagnose: [ { name: String, value: String } ],
    osteopathic: [ { name: String, value: String } ]
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
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const Examination = mongoose.model("examination", examinationSchema);

module.exports = Examination;