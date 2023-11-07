const Consultation = require("../../model/Consultation");
const _ = require("lodash");
const consultationService = require("../../services/consultation.service");
const UserValidator = require("../../validators/user.validator");
const message = require("../../messages/messages");
const Symptom = require("../../model/Symptoms");
const Patient = require("../../model/Patient");
const Provider = require("../../model/Provider")
const BadRequestError = require("../../errors/BadRequestError");
const consultationSchema = require("../../model/Consultation")
const Examination = require("../../model/Examination");

class ProviderController {

  async create(req, res) {
    const { symptomsArr, patientId, date } = req.body;
    // console.log(req.body, "Body")
    const { id: createdBy } = req.user;
    const { symptoms, consultation } = await consultationService.create(symptomsArr, patientId, createdBy, date);
    return res.status(201).send({ message: message.consultation.registered, symptoms, consultation });

  }

  async addSymptoms(req, res) {
    const { symptomsArr } = req.body;
    const symptoms = await consultationService.addSymptoms(symptomsArr);
    return res.status(200).send({ message: message.symptom.added, symptoms });
  }

  async updateSymptom(req, res) {
    const symptom = await consultationService.updateSymptom(req.body);
    return res.status(200).send({ message: message.symptom.update, symptom });
  }

  async all(req, res) {
    const { id: createdBy, role } = req.user;
    const { search } = req.query;
    const filter = { isActive: true, createdBy }
    if (role === "Health care provider") {
      const provider = await Provider.findOne({ userId: createdBy })
      const ownerAllConsultations = await Consultation.find({ createdBy: provider.createdBy, isActive: true }).populate("patientId")
      const allConsultation = await consultationService.all(filter, ownerAllConsultations)
      const filtered = allConsultation.filter((data) => {
        return ((data.patientId ? data?.patientId?.firstName : "") + " " +
          (data.patientId ? data?.patientId?.lastName : "").toLowerCase().startsWith(search.toLowerCase()))
      })
      res.status(200).send({ message: message.consultation.all, allConsultation, filtered })
    } else {
      // console.log(createdBy)
      const allProvider = await Provider.find({ isActive: true, createdBy: createdBy })
      let filterData = allProvider.map(async (provider) => {
        const eachProviderConsultation = await Consultation.find({
          isActive: true, createdBy: provider.userId,
        }).populate("patientId")
        return eachProviderConsultation;
      })
      let providerAllConsultation = await Promise.all(filterData).then(r => r).catch(err => console.log(err));
      providerAllConsultation = providerAllConsultation.reduce((acc, arr) => [...acc, ...arr], []);
      // console.log(providerAllConsultation.length, providerAllConsultation, "QQQ")
      const allConsultation = await consultationService.all(filter, providerAllConsultation)
      const filtered = allConsultation.filter((data) => {
        // console.log(data?.patientId, "IDDDDDD")
        return ((data.patientId ? data?.patientId?.firstName : "") + " " +
          (data.patientId ? data?.patientId?.lastName : "").toLowerCase().startsWith(search.toLowerCase()))
      })
      // console.log(filtered, "filterreddddddd")
      res.status(200).send({ message: message.consultation.all, allConsultation, filtered });
    }

  }

  async recent(req, res) {
    const { id: createdBy, role } = req.user;
    let { search, limit, page } = req.query;
    // console.log(search, "dsdf")
    let flag = false;
    const filter = {
      isActive: true, createdBy,
      $or: [
        { "patient.firstName": { $regex: search, $options: "i" } },
        { "patient.lastName": { $regex: search, $options: "i" } }
      ]
    }
    if(role === "Health care provider") {
      const provider = await Provider.findOne({ userId: createdBy })
      const ownerAllConsultations = await Consultation.find({ createdBy: provider.createdBy, isActive: true }).populate("patientId").sort({ createdAt: -1 })
      let allConsultation = await consultationService.all(filter, ownerAllConsultations)
      const filtered = allConsultation.map(async consultation => {
        const examination = await Examination.find({ consultationId: consultation._id });
        if (!examination.length > 0) {
          return consultation;
        }
      })  
      const promise = await Promise.all(filtered).then(r => r).catch(err => console.log(err));
       allConsultation = promise.filter((data) => {
         if (data) return true
       })
       page = parseInt(page) || 1, limit = parseInt(limit) || allConsultation.length;
       const startIndex = (page - 1) * limit;
       const endIndex = startIndex + limit;
       let currentPageData = allConsultation.slice(startIndex, endIndex);
       currentPageData = await consultationService.searchUsers(search, currentPageData, flag)
       res.status(200).send({ message: message.consultation.recent, allConsultation: currentPageData, allCount: allConsultation.length });
    } else {
      const allProvider = await Provider.find({ isActive: true, createdBy: createdBy })
      let filterData = allProvider.map(async (provider) => {
        const eachProviderConsultation = await Consultation.find({
          isActive: true, createdBy: provider.userId,
        }).populate("patientId").sort({ createdAt: -1 })
        return eachProviderConsultation;
      })
      let providerAllConsultation = await Promise.all(filterData).then(r => r).catch(err => console.log(err));
      providerAllConsultation = providerAllConsultation.reduce((acc, arr) => [...acc, ...arr], []);
      let allConsultation = await consultationService.all(filter, providerAllConsultation)
    const filtered = allConsultation.map(async consultation => {
      const examination = await Examination.find({ consultationId: consultation._id });
      if (!examination.length > 0) {
        return consultation;
      }
    })  
    const promise = await Promise.all(filtered).then(r => r).catch(err => console.log(err));

    allConsultation = promise.filter((data) => {
      if (data) return true
    })
    // console.log(allConsultation.length);
    page = parseInt(page) || 1, limit = parseInt(limit) || allConsultation.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    let currentPageData = allConsultation.slice(startIndex, endIndex);
    // console.log(currentPageData.length, "CUuruasd")
    currentPageData = await consultationService.searchUsers(search, currentPageData, flag)
    // console.log(currentPageData.length, "search")
    res.status(200).send({ message: message.consultation.recent, allConsultation: currentPageData, allCount: allConsultation.length });
    }
  }

  async byPatientId(req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id);
    const consultationArr = await consultationService.byPatientId(id);
    // console.log(consultationArr, "ConsultationARR")
    res.status(200).send({ message: message.consultation.byId, consultationArr });
  }

  async byId(req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id);
    const { consultation, symptomsArr } = await consultationService.byId(id);
    res.status(200).send({ message: message.consultation.byId, consultation, symptomsArr });
  }

  async update(req, res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    const consultation = await consultationService.update(req.body.id, update);
    res.status(200).send({ message: message.consultation.update, consultation });
  }

  async symptomById(req, res) {
    // console.log(this)
    const { id } = req.query;
    // console.log(id, "iddddd");
    const symptom = await Symptom.findById(id);
    // console.log(symptom, "Symptotjnsdmfasdf");
    res.status(200).send({ message: message.symptom.symptomById, symptom });
  }

}

module.exports = new ProviderController();
