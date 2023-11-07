const DataService = require("./data.service");
const Consultation = require("../model/Consultation");
const message = require("../messages/messages");
const Symptom = require("../model/Symptoms");
const NotFoundError = require("../errors/NotFoundError");

class ConsultationService extends DataService {

  async update(id, update) {
    return await this.findByIdAndUpdate(Consultation, id, update, message.consultation.notExisted);
  }

  async create(symptomsArr, patientId, createdBy, date) {
    let consultation = new Consultation({
      createdBy,  
      patientId,
      date,
    });
    consultation = await consultation.save();
    let myData = [];
    for (let i in symptomsArr) {
      myData.push({ ...symptomsArr[i], consultationId: consultation._id });
    }
    const symptoms = await Symptom.insertMany(myData);
    return { symptoms, consultation };
  }

  async byPatientId(patientId) {
    const consultationArr = await Consultation.find({ patientId });
    if (!consultationArr.length) throw new NotFoundError(message.consultation.notExisted);
    return consultationArr;
  }

  async byId(consultationId) {
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) throw new NotFoundError(message.consultation.notExisted);
    const symptomsArr = await Symptom.find({ consultationId });
   
    if (!symptomsArr.length) throw new NotFoundError(message.symptom.notExisted);
    return { consultation, symptomsArr };
  }

  async all(filter, addConsultations) {
    const allConsultations = await Consultation.find(filter).sort({ createdAt: -1 }).populate("patientId").sort({ createdAt: -1});
    Array.prototype.push.apply(allConsultations, addConsultations);
    return allConsultations;  
  }

  async recent(filter) {
    // console.log(filter, "filterrrrrrr");
    return await Consultation.find(filter).sort({ createdAt: -1 }).populate("patientId");
  }

  async addSymptoms(symptomsArr) {
    return await Symptom.insertMany(symptomsArr);
  }

  async updateSymptom(symptom) {
    const { id } = symptom;
    return await Symptom.findByIdAndUpdate(id, symptom, { new: true });
  }

  async symptomById(symptomId) {
    // console.log(symptomId, "symptomIddddd");
    const symptom = await Symptom.findById(symptomId);
    if (!symptom) throw new NotFoundError(message.symptom.notExisted);
    return symptom;
  }
}

module.exports = new ConsultationService();
