const DataService = require("./data.service");
const visitDetail = require("../model/visitDetails");

class visitDetailService extends DataService {

    async create(functional, treatments, appointmentId, createdBy, examinationId, consultationId, patientId, dailyNote, date) {
        // console.log(appointmentId, "appointmentID")
        let visitData = await visitDetail.create({
            functional,
            treatments,
            appointmentId,
            createdBy,
            examinationId,
            consultationId,
            patientId,
            dailyNote,
            date
        })
        return visitData.save()
    }

    async update(id, update) {
        return await visitDetail.findByIdAndUpdate(id, update)
    }

    async all(filter) {
        return await visitDetail.find(filter).sort({ createdAt: -1 });
    }

}


module.exports = new visitDetailService()