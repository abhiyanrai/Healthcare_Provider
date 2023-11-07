const DataService = require("./data.service");
const examinationSchema = require("../model/Examination")


class examinationService extends DataService {

    async create (functional, orthopadic, diagnoses, treatments, createdBy, consultationId, date) {
        let examination = await examinationSchema.create({
            functional, orthopadic, diagnoses, treatments, createdBy, consultationId, date
          })
    //  console.log(examination, "examinaitonat")
    // examination = await examination.populate("consultationId")      
    return examination;
    }

    async allExamination(filter) {
        return await examinationSchema.find(filter).sort({createdAt: -1})
    }

    async update (id, update) {
        // console.log(id, update,  "Kakakakaka");
        return await examinationSchema.findByIdAndUpdate(id, update)
    }
}


module.exports = new examinationService()
