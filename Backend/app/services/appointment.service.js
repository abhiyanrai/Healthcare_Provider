const DataService = require("./data.service");
const Appointment = require("../model/Appointment")

class appointmentService extends DataService {
  
    async create(appointmentObj) {
        const appointment = Appointment.create(appointmentObj);
        return appointment
    }

      async update(id, update) {
        return await this.findByIdAndUpdate(Appointment, id, update);  
      }
    
    async fetchAppointments(filter) {
       return await Appointment.find(filter).sort({ createdAt: -1 })
       .populate([ 
        { path: 'roomId', model: 'room'},
        { path: 'serviceId', model: 'service'},
        { path: "patientId", model: "patient"}
      ])
    }  
   

    async delete(id, filter) {
      // console.log(id, filter, "idfilterrrr")
      return await Appointment.findByIdAndUpdate(id, filter)
  }

  }
  
  module.exports = new appointmentService();