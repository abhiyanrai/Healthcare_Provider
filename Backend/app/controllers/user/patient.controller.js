const Patient = require("../../model/Patient");
const _ = require("lodash");
const BadRequestError = require("../../errors/BadRequestError");
const NotFoundError = require("../../errors/NotFoundError");
const patientService = require("../../services/patient.service");
const UserValidator = require("../../validators/user.validator");
const message = require("../../messages/messages");
const bcrypt = require("bcryptjs");
const Consultation = require("../../model/Consultation");
const Examination = require("../../model/Examination");
const Visit = require("../../model/visitDetails")
const Provider = require("../../model/Provider");

class ProviderController {

  async create(req, res) {
    const { id: createdBy } = req.user;
    // console.log(createdBy, "REQ.BODYYYY")
    const patient = await patientService.create({ ...req.body, createdBy });
    // console.log(patient, "Patients")
    res.status(201).send({ message: message.patient.registered, patient });
  }

  async all(req, res) {
    const { id: createdBy, role } = req.user;
    console.log(createdBy, role, "createdBYyy")
    let { search, page, limit } = req.query;
    const filter = {
      isActive: true,
      createdBy,
      $and: [
        {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$firstName", " ", "$lastName"] },
                  regex: search,
                  options: "i",
                },
              },
            },
            { fileNo: { $regex: search, $options: "i" } },
          ],
        },
        {
          $or: [
            { isNewPatient: true },
            { isNewPatient: false },
          ],
        },
      ],
    };
    if (role === "Health care provider") {
      // initial = true;
      const provider = await Provider.findOne({ userId: createdBy });
      console.log(provider)
      const ownerAllPatients = await Patient.find({ createdBy: provider.createdBy, isActive: true, $or: filter.$and })
        .sort({ createdAt: -1 });
      // console.log(ownerAllPatients)
      const allPatients = await patientService.all(filter, ownerAllPatients);
      (page = parseInt(page) || 1), (limit = parseInt(limit) || allPatients.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const currentPageData = allPatients.slice(startIndex, endIndex)

      res.status(200).send({ message: message.patient.all, allPatients: currentPageData, allCount: allPatients.length });
    } else {
      // console.log(role);
      // console.log(filter.$and)
      const allProvider = await Provider.find({ isActive: true, createdBy: createdBy });
      let filtered = allProvider.map(async (provider) => {
        const eachProviderPatients = await Patient.find({
          isActive: true,
          createdBy: provider.userId,
          $or: filter.$and,
        })
        return eachProviderPatients;
      });
      let providerAllPatients = await Promise.all(filtered)
        .then((r) => r)
        .catch((err) => console.log(err));
      providerAllPatients = providerAllPatients.reduce((acc, arr) => [...acc, ...arr], []);
      // console.log(providerAllPatients, "provider")
      const totalCount = providerAllPatients.length + (await Patient.find(filter)).length;
      // console.log(totalCount)
      let allPatients = await patientService.all(filter, providerAllPatients);
      (page = parseInt(page) || 1), (limit = parseInt(limit) || allPatients.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      allPatients = allPatients.slice(startIndex, endIndex);
      // console.log(allPatients.length, "Length")
      res.status(200).send({ message: message.patient.all, allPatients, allCount: totalCount });
    }
  }

  async withoutConsultation(req, res) {
    const { id: createdBy, role } = req.user;
    // console.log(createdBy, role, "createdBy")
    let { search, page, limit } = req.query;
    const filter = {
      isActive: true,
      createdBy,
      $and: [
        {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$firstName", " ", "$lastName"] },
                  regex: search,
                  options: "i",
                },
              },
            },
            { fileNo: { $regex: search, $options: "i" } },
          ],
        },
        {
          $or: [
            { isNewPatient: true },
            { isNewPatient: false },
          ],
        },
      ],
    };
    if (role == "Health care provider") {
      const provider = await Provider.findOne({ userId: createdBy });
      const ownerAllPatients = await Patient.find({ createdBy: provider.createdBy, isActive: true, $or: filter.$and })
        .sort({ createdAt: -1 });
      let allPatients = await patientService.allWithoutConsultation(filter, ownerAllPatients);
      const filtered = allPatients.map(async (patient) => {
        const consultation = await Consultation.find({ patientId: patient._id });
        if (!consultation.length > 0) {
          return patient;
        }
      });
      const p = await Promise.all(filtered)
        .then((r) => r)
        .catch((err) => console.log(err));
      allPatients = p.filter((data) => {
        if (data) return true;
      });
      (page = parseInt(page) || 1), (limit = parseInt(limit) || allPatients.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const currentPageData = allPatients.slice(startIndex, endIndex)
      res.status(200).send({ message: message.patient.all, allPatients: currentPageData, allCount: allPatients.length });
    } else {
      const allProvider = await Provider.find({ isActive: true, createdBy: createdBy });
      let filterData = allProvider.map(async (provider) => {
        const eachProviderPatients = await Patient.find({
          isActive: true,
          createdBy: provider.userId,
          $or: filter.$and,
        });
        return eachProviderPatients;
      });
      let providerAllPatients = await Promise.all(filterData)
        .then((r) => r)
        .catch((err) => console.log(err));
      providerAllPatients = providerAllPatients.reduce((acc, arr) => [...acc, ...arr], []);
      let allPatients = await patientService.allWithoutConsultation(filter, providerAllPatients);
      const filtered = allPatients.map(async (patient) => {
        const consultation = await Consultation.find({ patientId: patient._id });
        if (!consultation.length > 0) {
          return patient;
        }
      });
      const p = await Promise.all(filtered)
        .then((r) => r)
        .catch((err) => console.log(err));
      const filteredAllPatients = p.filter((data) => {
        if (data) return true;
      });
      (page = parseInt(page) || 1), (limit = parseInt(limit) || filteredAllPatients.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const currentPageData = filteredAllPatients.slice(startIndex, endIndex);

      res
        .status(200)
        .send({ message: message.patient.all, allPatients: currentPageData, allCount: filteredAllPatients.length });
    }
  }

  async newPatients(req, res) {
    const { id: createdBy, role } = req.user;
    // console.log(createdBy, role, "CreatedBYyyyy")
    let { search, page, limit } = req.query;
    const filter = {
      isActive: true,
      createdBy,
      isNewPatient: true,
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: search,
              options: "i",
            },
          },
        },
        { fileNo: { $regex: search, $options: "i" } },
      ]
    };
    if (role == "Health care provider") {
      // console.log("we're in provider")
      const provider = await Provider.findOne({ userId: createdBy });
      const ownerNewPatients = await Patient.find({
        createdBy: provider.createdBy, isActive: true,
        isNewPatient: true, $or: filter.$or
      })
        .sort({ createdAt: -1 });
      // console.log(ownerNewPatients)
      const allPatients = await patientService.all(filter, ownerNewPatients);
      (page = parseInt(page) || 1), (limit = parseInt(limit) || allPatients.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const currentPageData = allPatients.slice(startIndex, endIndex)
      res.status(200).send({ message: message.patient.newPatients, allPatients: currentPageData, allCount: allPatients.length });

    } else {
      try {
        const allProviders = await Provider.find({ isActive: true, createdBy });
        
        const providerUserIds = allProviders.map(provider => provider.userId);
        
        const providerNewPatients = await Patient.aggregate([
          {
            $match: {
              isActive: true,
              createdBy: { $in: providerUserIds },
              isNewPatient: true,
              $or: filter.$or,
            },
          },
          {
            $sort: { createdAt: -1 } 
          }
        ]);
    
        const totalCount = providerNewPatients.length + (await Patient.countDocuments(filter));
    
        let allPatients = await patientService.all(filter, providerNewPatients);
    
        const startIndex = (parseInt(page) || 1) - 1;
        const endIndex = startIndex + (parseInt(limit) || allPatients.length);
        allPatients = allPatients.slice(startIndex, endIndex);
    
        res.status(200).send({ message: message.patient.newPatients, allPatients, allCount: totalCount });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Something went wrong' });
      }
  }

}

  async regularPatients(req, res) {
    const { id: createdBy, role } = req.user;
    // console.log(createdBy,  role, "CreatedBYyyyy")
    let { search, page, limit } = req.query;
    const filter = {
      isActive: true,
      createdBy,
      isNewPatient: false,
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: search,
              options: "i",
            },
          },
        },
        { fileNo: { $regex: search, $options: "i" } },
      ]

    };
    if (role == "Health care provider") {
      // console.log("we're in provider")
      const provider = await Provider.findOne({ userId: createdBy });
      const ownerRegularPatients = await Patient.find({
        createdBy: provider.createdBy, isActive: true,
        isNewPatient: false, $or: filter.$or
      })
        .sort({ createdAt: -1 });
      // console.log(ownerRegularPatients)
      const allPatients = await patientService.all(filter, ownerRegularPatients);
      (page = parseInt(page) || 1), (limit = parseInt(limit) || allPatients.length);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const currentPageData = allPatients.slice(startIndex, endIndex)
      res.status(200).send({ message: message.patient.regularPatients, allPatients: currentPageData, allCount: allPatients.length });

    } else {
      try {
        const allProviders = await Provider.find({ isActive: true, createdBy });
    
        const providerUserIds = allProviders.map(provider => provider.userId);
        const providerRegularPatients = await Patient.aggregate([
          {
            $match: {
              isActive: true,
              createdBy: { $in: providerUserIds },
              isNewPatient: false,
              $or: filter.$or,
            },
          },
          {
            $sort: { createdAt: -1 } 
          }
        ]);
    
        const totalCount = providerRegularPatients.length + (await Patient.countDocuments(filter));
    
        let allPatients = await patientService.all(filter, providerRegularPatients);
    
        const startIndex = (parseInt(page) || 1) - 1;
        const endIndex = startIndex + (parseInt(limit) || allPatients.length);
        allPatients = allPatients.slice(startIndex, endIndex);
    
        res.status(200).send({ message: message.patient.regularPatients, allPatients, allCount: totalCount });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
      }
  }
}

  // async byAuth(req, res) {
  //   const { id: userId } = req.user;
  //   const provider = await Provider.findOne({ userId }).populate("userId", "salutation firstName lastName email contactNo profilePic");
  //   res.status(200).send({ message: "Provider by auth", provider });
  // }

  async byId(req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id);
    const patient = await Patient.findOne({ _id: id });
    res.status(200).send({ message: message.patient.byId, patient });
  }

  async update(req, res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    const patient = await patientService.update(req.body.id, update);
    res.status(200).send({ message: message.patient.update, patient });
  }

  async allPatientData(req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id);
    // console.log(id, "IDDDDD")
    const allConsult = await Consultation.find({ isActive: true, patientId: id });
    // console.log(allConsult, allConsult.length, "allConsulttt")
    let filtered = allConsult.map(async (el) => {
      // console.log(el, el._id, "ELLLl")
      const allExam = await Examination.findOne({ isActive: true, consultationId: el._id });
      // console.log(allExam, "allExaminationDatatatatata")

      return allExam;
    });
    filtered = await Promise.all(filtered)
      .then((r) => r)
      .catch((err) => console.log(err));
    filtered = filtered.filter(value => value !== null);
    res.status(200).send({ message: message.patient.allData, allConsult, allExam: filtered });
  }

  async withExamination(req, res) {
    const allExam = await Examination.find({ isActive: true }).populate({
      path: 'consultationId',
      populate: {
        path: 'patientId',
        model: 'patient'
      }
    });
    // console.log(allExam, "eeee")

    const patientObjs = allExam.map(exam => exam.consultationId?.patientId);
    const filteredPatientObjs = patientObjs.filter(patient => patient);

    // console.log(patientObjs);
    return res.status(200).send({ message: message.patient.withExamination, patientObjs: filteredPatientObjs });
  }

  // async allProvider(req, res) {
  //   const { id: createdBy } = req.user;
  //   let allProviders = await Provider.find({ isActive: true, createdBy })
  //     .populate("userId", "salutation firstName lastName email contactNo profilePic")
  //     .sort({ createdAt: -1 });
  //   res.status(200).send({ message: "all Providers", allProviders });
  // }

  // async changePassword(req, res) {
  //   // essentials
  //   const { id } = req.user;
  //   const { oldPassword, newPassword, confirmPassword } = req.body;

  //   // validation n

  //   // change password
  //   const user = await User.findById(id);
  //   if (!user) throw new NotFoundError("user does not exist with this id");
  //   const valid = await bcrypt.compare(oldPassword, user.password);
  //   if (!valid) throw new BadRequestError("old password is not correct");
  //   user.password = await bcrypt.hash(newPassword, 10);
  //   user.save();

  //   // response
  //   res.status(200).send({ message: "Password change successfully", user });
  // }
}

module.exports = new ProviderController();
