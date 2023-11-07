const BadRequestError = require("../../errors/BadRequestError");
const messages = require("../../messages/messages");
const clinicScheduleService = require("../../services/clinicSchedule.service")
const ClinicSchedule = require("../../model/clinicSchedule")
const _ = require("lodash");
const NotFoundError = require("../../errors/NotFoundError");
const Provider = require("../../model/Provider");
const DataService = require("../../services/data.service");

async function mergeHolidays(existingHolidays, newHolidays) {
 
  const mergedHolidays = [...existingHolidays];

  for (const newHoliday of newHolidays) {
    const isDuplicate = existingHolidays.some((existingHoliday) => {
      return existingHoliday.date === newHoliday.date || existingHoliday.name === newHoliday.name;
    });

    if (!isDuplicate) {
      mergedHolidays.push(newHoliday);
    }
  }

  return mergedHolidays;
}


class clinicSchedule extends DataService {

  async createAndUpdate(req, res) {
    const { id: createdBy, role } = req.user, { id: clinicScheduleId } = req.body;
    if (!(role == "Acount owner")) throw new BadRequestError(messages.clinicSchedule.owner);
    let schedule;
    if (clinicScheduleId) {
      const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
      if(update.holidays && update.holidays.length > 0){
        const existingSchedule = await ClinicSchedule.findById(clinicScheduleId);
        if (!existingSchedule) throw new NotFoundError(messages.clinicSchedule.notExisted);
        const holidays = await clinicScheduleService.generateHolidays(update)
        update.holidays = holidays;
       if(existingSchedule.holidays && existingSchedule.holidays.length > 0) {
        update.holidays = await mergeHolidays(existingSchedule.holidays, update.holidays);
       }
      }
      schedule = await ClinicSchedule.findByIdAndUpdate(clinicScheduleId, update, { new: true });
      if (!schedule) throw new NotFoundError(messages.clinicSchedule.notExisted);
    } else {
      const existedSchedule = await ClinicSchedule.find({ isActive: true, createdBy })
      if (existedSchedule.length > 0) throw new BadRequestError(messages.clinicSchedule.existed)
      schedule = await clinicScheduleService.create({ ...req.body, createdBy });
     
    }

    return res.status(201).send({ message: messages.clinicSchedule.create, schedule });
  }

  async getByAccountOwner(req, res) {
    const { id: createdBy, role } = req.user;
     if(role === "Health care provider") {
      const provider = await Provider.findOne({ userId: createdBy });
      const schedule = await ClinicSchedule.findOne({ createdBy: provider.createdBy, isActive: true });
      if (!schedule) throw new NotFoundError(messages.clinicSchedule.notExisted);
      return res.status(201).send({ message: messages.clinicSchedule.get, schedule });
    } else {
    const schedule = await ClinicSchedule.findOne({ createdBy, isActive: true });
    // console.log(schedule, "Schedule")
    if (!schedule) throw new NotFoundError(messages.clinicSchedule.notExisted)
    return res.status(201).send({ message: messages.clinicSchedule.get, schedule });
    }
  }
  async deleteHoliday(req, res) {

    const { holidayId, holidayName } = req.query;
  
    try {
      let schedule;
      
      if (holidayId) {
        schedule = await ClinicSchedule.findOneAndUpdate(
          { "holidays._id": holidayId },
          { $pull: { holidays: { _id: holidayId } } },
          { new: true }
        );
      } else if (holidayName) {
        schedule = await ClinicSchedule.findOneAndUpdate(
          { "holidays.name": holidayName },
          { $pull: { holidays: { name: holidayName } } },
          { new: true }
        );
      }
      
      if (!schedule) {
        throw new NotFoundError("Holiday not found");
      }
      
      return res.status(200).send({ message: "Holiday(s) deleted successfully", schedule });
    } catch (error) {
      return res.status(500).send({ message: "Failed to delete holiday", error });
    }
  }
  

}


module.exports = new clinicSchedule();