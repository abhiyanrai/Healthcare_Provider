const DataService = require("./data.service");
const Patient = require("../model/Patient");
const message = require("../messages/messages")
const NotFoundError = require("../errors/NotFoundError");
const Consultation = require("../model/Consultation");
const moment = require('moment')

class PatientService extends DataService {

  async update(id, update) {
    // console.log(this.generateFile())
    // console.log(update, "updateeeee")
    // let count = await this.generateFile(new Date("1899-12-31"), new Date(update.dob))
    // console.log(count, "fileeee")
    // let fileCount = update.lastName.toLowerCase() + count + " "
    // return await this.findByIdAndUpdate(Patient, id, {...update, fileNo: fileCount }, message.patient.notExisted);
    return await this.findByIdAndUpdate(Patient, id, update, message.patient.notExisted);
  }


  async create(patientObj) {
    var patient = new Patient(patientObj);
    var defaultDate = new Date("1899-12-31")
  //  console.log(patient.dob, "dob  ")  
  // console.log(patientObj)
    var generateFileNumber = function generateFileNumber(lastName, startDate, endDate) {
      // console.log(endDate, "enDateee")
      let difference = endDate.getTime() - startDate.getTime();
      let count = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
      let fileCount = lastName.toLowerCase().replace(/\s+/g, '') + count;
      // console.log(fileCount, "fileCouintt")
      return fileCount;
    }
    let fileNo = generateFileNumber(patient.lastName, defaultDate, new Date(patient.dob))
// console.log(fileNo, "before")
    const allPatients = await Patient.find({lastName: patient.lastName, dob: patient.dob});
    // console.log(allPatients, "PPPPP")
      if (allPatients.length > 0) {
        let split = fileNo.split(/(\d+)/);
              split[1] = Number(split[1]) + allPatients.length;
              fileNo = split[0] + split[1];
              // console.log(fileNo, "after")
        }
          patient.fileNo = fileNo; //Rai3214
    await patient.save();
    //  console.log(patient, "Save--Patients")
    return patient;
  }


  async all(filter, addPatients) {
    const allPatients = await Patient.find(filter).sort({ createdAt: -1 });
    Array.prototype.push.apply(allPatients, addPatients);
    return allPatients
  }


  async allWithoutConsultation(filter, addPatients) {
    let allPatients = await Patient.find(filter).sort({ createdAt: -1 });
    Array.prototype.push.apply(allPatients, addPatients);
    return allPatients;
  }


  

}

module.exports = new PatientService();