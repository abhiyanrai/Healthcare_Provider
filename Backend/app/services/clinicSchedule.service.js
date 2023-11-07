const DataService = require("./data.service");
const ClinicSchedule = require("../model/clinicSchedule");
const messages = require("../messages/messages")


class ClinicScheduleService extends DataService {

  async create(clinicScheduleObj) {
    if (clinicScheduleObj.holidays && clinicScheduleObj.holidays.length > 0) {
      const holidays = await this.generateHolidays(clinicScheduleObj)
      clinicScheduleObj.holidays = holidays;
    }
  
    return await ClinicSchedule.create(clinicScheduleObj);
  }
  






}

module.exports = new ClinicScheduleService();