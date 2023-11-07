const visitDetailService = require("../../services/visitDetail.service")
const message = require("../../messages/messages");
const BadRequestError = require("../../errors/BadRequestError");
const appointmentSchema = require("../../model/Appointment")
const examinationSchema = require("../../model/Examination")
const UserValidator = require("../../validators/user.validator");
const visitSchema = require("../../model/visitDetails")
const Patient = require("../../model/Patient")
const _ = require("lodash");
const messages = require("../../messages/messages");

class visitDetailController {

    async create(req, res) {
        const { functional, treatments, appointmentId, examinationId, patientId, dailyNote, date } = req.body;
        const { id: createdBy } = req.user;
        // console.log(createdBy, "createtd") 
        const patient = await Patient.findById({ _id: patientId })
        const appointment = await appointmentSchema.findById({ _id: appointmentId })
        const findExam = await examinationSchema.findById({ _id: examinationId })
        // console.log(findExam, "findExammmmmm")   
        if (!patient) {
            throw new BadRequestError(message.visitDetail.notFound.patient)
        }
        if (!appointment) {
            throw new BadRequestError(message.visitDetail.notFound.appointment)
        } else if (!findExam) {
            throw new BadRequestError(message.visitDetail.notFound.exam)
        } else if (appointment && findExam && patientId) {
            const visitDetail = await visitDetailService.create(functional, treatments, appointment._id, createdBy, findExam._id,
                findExam.consultationId, patientId, dailyNote, date)
            // console.log(patient, "statusofPatient")
            return res.status(201).send({ message: message.visitDetail.create, visitDetail })
        }
    }

    async updateVisitById(req, res) {
        const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
        const visit = await visitDetailService.update(req.body.id, update);
        res.status(200).send({ message: message.visitDetail.update, visit });
    }

    async byId(req, res) {
        const { id } = UserValidator.validateObjectId(req.query.id)
        const visit = await visitSchema.findOne({ _id: id })
        res.status(200).send({ message: message.visitDetail.byId, visit })
    }


    async allByPatientId(req, res) {
        const { id } = req.query;
        // console.log(id, "id")    
        const visitDetails = await visitSchema.find({ patientId: id })
        res.status(200).send({ message: "Visit details by patientId get successfully", visitDetails })
    }

    async all(req, res) {
        // const { id: createdBy } = req.user;
        // console.log(createdBy)
        const { id } = UserValidator.validateObjectId(req.query.id);
        const findExam = await examinationSchema.findOne({ _id: id })
        if(!findExam) throw new BadRequestError(messages.examination.notFound)
        let TotalCm = Number(findExam.functional.ProneCrest.cm) + Number(findExam.functional.SI.cm)
        const allVisit = await visitDetailService.all({ examinationId: id, isActive: true })
        // console.log(allVisit, "AllVisit")
        let filter = [];
        for (let i = allVisit.length - 1; i >= 0; i--) {
            const el = allVisit[i];
            // console.log(Number(el.functional.ProneCrest.cm) + Number(el.functional.SI.cm), index)
            // console.log(el)
            var progress = await visitDetailService.generateProgress(TotalCm, el.functional.ProneCrest.cm, el.functional.SI.cm)
            TotalCm = progress.latestTotal;
            const json = JSON.parse(JSON.stringify(el));
            json.progress = progress.progress;
            // console.log(TotalCm)
            filter.push(json);
        }
        // filter = await Promise.all(filter).then(r => r);
        res.status(200).send({ message: message.visitDetail.all, allVisit: filter, });
    }


    // async all(req, res) {
    //     const { id } = UserValidator.validateObjectId(req.query.id);
    //     const findExam = await examinationSchema.findOne({ consultationId: id })
    //     // console.log(findExam, "findExammmm")  
    //     var TotalCm = Number(findExam.functional.ProneCrest.cm) + Number(findExam.functional.SI.cm)
    //     // console.log(TotalCm, "iiiii")       
    //     const allVisit = await visitDetailService.all({ consultationId: id, isActive: true })
    //     // console.log(allVisit);
    //     let filter = allVisit.map(async (el, index) => {
    //     // console.log(el.functional.ProneCrest.cm, el.functional.SI.cm)
    //     //   console.log(TotalCm, "$$$$$")
    //     var progress = await visitDetailService.generateProgress(TotalCm, el.functional.ProneCrest.cm, el.functional.SI.cm)
    //     TotalCm = progress.latestTotal  
    //     // console.log(TotalCm, "TOTALL")
    //     const json = JSON.parse(JSON.stringify(el));
    //     json.progress = progress.progress;
    //     return json;
    //     })
    //      filter = await Promise.all(filter).then(r => r);
    //     res.status(200).send({ message: message.visitDetail.all, 
    //          allVisit: filter });
    // }

}


module.exports = new visitDetailController();   