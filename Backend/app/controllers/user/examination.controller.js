const examinationService = require("../../services/examination.service");
const message = require("../../messages/messages");
const _ = require("lodash");
const BadRequestError = require("../../errors/BadRequestError");
const symptomSchema = require("../../model/Symptoms")
const Consultation = require("../../model/Consultation")
const patientService = require("../../services/patient.service");
const Patient = require("../../model/Patient");
const Examination = require("../../model/Examination")
const UserValidator = require("../../validators/user.validator");
class examinationController {

 async create (req, res) {
    const { id: createdBy } = req.user;
    const { functional, diagnoses, orthopadic, treatments, consultationId, date } = req.body;
    const checkExamination = await Examination.findOne({consultationId: consultationId})
   if(checkExamination) {
      throw new BadRequestError(message.examination.examinationExist)
   } else {
    const checkConsultation = await Consultation.findOne({ _id: consultationId })  
   //  console.log(checkConsultation,"checkConsultationcheckConsultation");
    if(checkConsultation) {     
        const patient = await Patient.findOne({_id: checkConsultation.patientId})
        const consultationId = checkConsultation._id;
        const examination = await examinationService.create(functional, orthopadic, diagnoses, treatments, createdBy, consultationId, date)
        patient.isNewPatient = false;
        patient.save();
        return res.status(201).send({ message: message.examination.created, examination })
    } 
    else {
        throw new BadRequestError(message.examination.badRequestError)
    }
   } 
 }   

 async checkExamination(req, res) {
  const { id } = req.query;
  const findExam = await Examination.findOne({consultationId: id})
 if(findExam) {
   res.status(200).send({message: "Examination already Exist!", findExam: true})
 } else {
   res.status(200).send({message: "Examination not found!", findExam: false})
 }
 }
 
 async getExaminationById (req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id)
    const examination = await Examination.findOne({ _id: id })
   //  console.log(examination, "KonSaExammm");
    res.status(200).send({ message: message.examination.byId, examination })
 } 

 async allByConsultationId (req, res) {
   const { id: createdBy } = req.user;
   const { consultationId } = req.query;
   const allExamination = await examinationService.allExamination({isActive: true, createdBy, consultationId})
   res.status(200).send({ message: message.examination.allExamination, allExamination })
 }


 async updateExaminationById (req, res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    // console.log(update, "UPdaeteeeeeee")
    const examination = await examinationService.update(req.body.id, update);
    // console.log(examination, "exammmmm")
    res.status(200).send({ message: message.examination.update, examination });
 }

}   

module.exports = new examinationController()