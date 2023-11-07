const appointmentService = require("../../services/appointment.service")
const message = require("../../messages/messages");
const BadRequestError = require("../../errors/BadRequestError");
const _ = require("lodash");
const Provider = require("../../model/Provider")
const Appointment = require("../../model/Appointment");
const Patient = require("../../model/Patient")
const UserValidator = require("../../validators/user.validator");
const Examination = require("../../model/Examination")
const Consultation = require("../../model/Consultation")
const Visit = require("../../model/visitDetails")
const moment = require('moment');

class appointmentController {

  async create(req, res) {
    const { id: createdBy } = req.user;
    const appointment = await appointmentService.create({ ...req.body, createdBy });
    return res.status(201).send({ message: message.appointment.create, appointment });
  }

  async all(req, res) {

    const { id: createdBy, role } = req.user;
    let { startDate, endDate, page, limit } = req.query;
    const filter = { createdBy, isDeleted: false };

    if (startDate && endDate) {
      filter.startTime = {
        $gte: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        $lt: new Date(`${endDate}T23:59:59.999Z`).toISOString()
      }
    } else if(startDate) {
      filter.startTime = {
        $gte: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        $lt: new Date(`${startDate}T23:59:59.999Z`).toISOString()
      }
    } 

    let ownerAllAppointments = [];
    let providerAllAppointments = [];

    if (role === 'Health care provider') {
      const provider = await Provider.findOne({ userId: createdBy });
      ownerAllAppointments = await appointmentService.fetchAppointments({
        ...filter,
        createdBy: provider.createdBy
      });
      providerAllAppointments = await appointmentService.fetchAppointments({ ...filter, createdBy });
    } else {
      const allProvider = await Provider.find({ isActive: true, createdBy: createdBy });
      providerAllAppointments = await Promise.all(
        allProvider.map(async (provider) => {
          return appointmentService.fetchAppointments({ ...filter, createdBy: provider.userId });
        })
      );
      providerAllAppointments = providerAllAppointments.flat();
      ownerAllAppointments = await appointmentService.fetchAppointments({ ...filter });
     
    }

    const appointments = [...ownerAllAppointments, ...providerAllAppointments];

    if (startDate || endDate) {
      const currentPageData = appointmentService.paginationFunc(appointments, page, limit)
      return res.status(201).send({ message: message.appointment.all, appointment: currentPageData, allCount: appointments.length });
    } else {
      const newPatientAppointments = appointments.filter((appointment) => appointment.patientId.isNewPatient);
      const regularPatientAppointments = appointments.filter((appointment) => !appointment.patientId.isNewPatient);
      const currentPageData = appointmentService.paginationFunc(appointments, page, limit)
      return res.status(201).send({ message: message.appointment.all, appointmentPatientType: { newPatientAppointments, regularPatientAppointments }, appointment: currentPageData, allCount: appointments.length });
    }

  }



  async trackPatientDetails(req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id);
    const patient = await Patient.findById({ _id: id })
    const allConsultation = await Consultation.find({ patientId: patient._id })
    // console.log(allConsultation)
    let filteredExamination = allConsultation.map(async (el) => {
      // console.log(el, el._id, "ELLLl")
      const allExam = await Examination.findOne({ isActive: true, consultationId: el._id });
      // console.log(allExam, "allExaminationDatatatatata")
      return allExam;
    });
    filteredExamination = await Promise.all(filteredExamination)
      .then((r) => r)
      .catch((err) => console.log(err));
    filteredExamination = filteredExamination.filter(value => value !== null);
    const currentDate = moment(), todayDate = currentDate.format('YYYY-MM-DD'), increaseDate = currentDate.add(1, 'day').format('YYYY-MM-DD');
    const todaysAppointment = await appointmentService.fetchAppointments({
      patientId: id, isDeleted: false,
      startTime: {
        $gte: new Date(`${todayDate}T00:00:00.000Z`).toISOString(),
        $lt: new Date(`${todayDate}T23:59:59.999Z`).toISOString()
      }
    })
    // console.log(todaysAppointment[0]._id, "todaysAppointment")
    var filteredTodaysAppointment = [];
    for (let i = 0; i < todaysAppointment.length; i++) {
      const appointment = todaysAppointment[i];
      const visitDetail = await Visit.findOne({ appointmentId: appointment._id })
      // console.log(visitDetail)
      const json = JSON.parse(JSON.stringify(appointment));
      if (!visitDetail) {
        json.isVisited = false;
      } else {
        json.isVisited = true;
      }
      filteredTodaysAppointment.push(json);
    }
    // console.log(filteredTodaysAppointment, "tttt")
    const nextAppointment = await appointmentService.fetchAppointments({
      patientId: id, isDeleted: false,
      startTime: {
        $gte: new Date(`${increaseDate}T00:00:00.000Z`).toISOString(),
      }
    })
    res.status(200).send({ message: "Patient data get successfully", patient, reports: { allConsultation, allExamination: filteredExamination }, todaysAppointment: filteredTodaysAppointment, nextAppointment })
  }

  async allByPatientId(req, res) {
    // const { id: createdBy } = req.user;
    const { id } = UserValidator.validateObjectId(req.query.id);
    const filter = { patientId: id, isDeleted: false }
    const appointment = await appointmentService.fetchAppointments(filter)
    return res.status(201).send({ message: message.appointment.byPatientId, appointment })
  }

  async update(req, res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    const appointment = await appointmentService.update(req.body.id, update);
    res.status(200).send({ message: message.appointment.update, appointment });
  }

  async getById(req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id);
    const appointment = await Appointment.findOne({ _id: id });
    res.status(200).send({ message: message.appointment.byId, appointment });
  }

  async cancelAppointment(req, res) {
    const { appointmentId, actionType, reason } = req.body;
    // console.log(req.body, "PPP")
    try {
      const appointment = await Appointment.findById(appointmentId);
      //  console.log(appointment)
      if (!appointment) {
        return res.status(404).send({ message: "Appointment not found" });
      }
      switch (actionType) {
        case "cancel":
          appointment.status = "cancelled";
          break;
        case "reschedule":
          appointment.status = "rescheduled";
          break;
        case "outOfRoom":
          appointment.status = "outOfRoom";
          break;
        case "notShowed":
          appointment.status = "notShowed";
          break;
        default:
          return res.status(400).send({ message: "Invalid action type" });
      }
      appointment.reason = reason;
      await appointment.save();
      // console.log(appointment, "Appointment")
      return res.status(200).send({ message: "Appointment updated successfully", appointment });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      return res.status(500).send({ message: "An error occurred while cancelling the appointment" });
    }

  }

  async delete(req, res) {
    const { id: createdBy } = req.user;
    const filter = {
      isDeleted: true, createdBy: createdBy
    }
    const appointment = await appointmentService.delete(req.body.id, filter);
    res.status(200).send({ message: message.appointment.delete, appointment })
  }


}

module.exports = new appointmentController()