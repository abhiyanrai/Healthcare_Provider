const User = require("../../model/User");
const UserValidator = require("../../validators/user.validator");
const Provider = require("../../model/Provider")
const Patient = require("../../model/Patient")
const message = require("../../messages/messages");
const BadRequestError = require("../../errors/BadRequestError");
const Consultation = require("../../model/Consultation")
const Symptom = require("../../model/Symptoms")
const moment = require("moment")
const Transaction = require("../../model/Transaction")
const UserSubscription = require("../../model/UserSubscription")
const visitDetail = require("../../model/visitDetails")
const Examination = require("../../model/Examination")  
const mongoose = require("mongoose")
const  { ObjectId } = mongoose.Types
const ExcelJS = require('exceljs');
const stripe = require("stripe")("sk_test_51MgoC1SJ9OgD3edaieQa3I96BlNh8p63SMKJv6ABoIRVb6UU8jumIVz9HuBRXxasY7kEygL0BGtJFnlaffGbGcR3004lBzp9XS");
// const t = require("../../../public/uploads/file")
const path= require("path");
const DataService = require("../../services/data.service");
const { generateProgress } = require("../../services/visitDetail.service");
// const DataServiceService = require("../../services/data.service")


async function calculateVisitComparison(examination) {
 
  let totalCm = Number(examination.functional.ProneCrest.cm) + Number(examination.functional.SI.cm);
  
  const allVisits = await visitDetail.find({ examinationId: examination._id, isActive: true }).sort({ createdAt: -1 });

  if (allVisits.length === 0) {
    return { progress: "No visits found" };
  }

  for (const el of allVisits) {
    // const el = allVisits[i];
    const progressReport = await generateProgress(totalCm, el.functional.ProneCrest.cm, el.functional.SI.cm)
    totalCm = progressReport.latestTotal;
    return { progress: progressReport.progress, latest: progressReport.latestTotal, total : totalCm}
  }

}

class AuthController extends DataService {


  async allAdminData(req, res) {  
    let { page, limit, search } = req.query;
    // page = page - 1;
    const filter = {
     role: "Acount owner",
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$firstName", " ", "$lastName"] },
                  regex: search,
                  options: "i",
                },
              },
            }
          ]
    };
    const allProviders = await Provider.find();
    const allPatients = await Patient.find();
    const allOwners = await User.find(filter).sort({createdAt: -1})
    let data = [];
    for (let i = 0; i < allOwners.length; i++) {
      const el = allOwners[i];
      const json = JSON.parse(JSON.stringify(el));  
      const transaction = await Transaction.findOne({ userId: el._id }) 
      .sort({ updatedAt: -1 })
      .populate("subscriptionId");
      if(transaction){
        json.planName = transaction.planName ;
        json.status = transaction.status ;
        json.startDate = transaction.subscriptionId.startDate ;
        json.endDate = transaction.subscriptionId.endDate ;
        json.planPrice = transaction.subscriptionId.planTotalPrice
      } 
      data.push(json);
      // return el;
    }

    page = parseInt(page) || 1, limit = parseInt(limit) || data.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    let currentPageData = data.slice(startIndex, endIndex);
    res.status(200).send({ allOwners: allOwners.length, allPatients: allPatients.length, allProviders: allProviders.length,
    allOwners: currentPageData, allCount: allOwners.length})
  }

  async getOwnerById(req, res) {
    const { id } = req.query;
    let owner = await User.findById({_id: id});
    if(!owner) throw new BadRequestError("User not found");
    const transaction = await Transaction.findOne({ userId: id })
    .sort({ updatedAt: -1 })
    .populate("subscriptionId");
    // console.log(transaction, "{}{{{")
    let userSubscription
   if(!transaction){
    userSubscription = {};
   } else {
     userSubscription = {
        planeName: transaction.planName,
        status: transaction.status,
        startDate: transaction.subscriptionId.startDate,
        endDate: transaction.subscriptionId.endDate,
        planPrice: transaction.subscriptionId.planTotalPrice
      };
    }
    
   res.status(200).send({ message: message.owner.byId, owner, userSubscription });
  }


  async exportsAccountOwners(req, res) {
    const { startDate, endDate } = req.query;
    const filter = { role: "Acount owner"}
    if(startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        $lt: new Date(`${endDate}T23:59:59.999Z`).toISOString()
      }
    }
    try {
      const accountOwners = await User.find(filter).sort({ createdAt: -1 });
      // console.log(accountOwners.length, "Lengthhh");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');
      worksheet.columns = [
        { header: 'S.NO', key: 'SNO', width: 10 }, 
        { header: 'Name', key: 'Name', width: 30 }, 
        { header: 'Email ID', key: 'Email_ID', width: 40 },
        { header: 'Contact No', key: 'Contact_No', width: 20 }, 
        { header: 'Registration Date', key: 'Registration_Date', width: 20 }, 
        { header: 'Subscription Start Date', key: 'Subscription_Start_Date', width: 20 },
        { header: 'Subscription End Date', key: 'Subscription_End_Date', width: 20 },
        { header: 'Product Name', key: 'Product_Name', width: 20 },
        { header: 'Product Price', key: 'Product_Price', width: 20 },
        { header: 'Total Payment', key: 'Total_Payment', width: 20 },
        { header: 'No of Healthcare Accounts', key: 'Accounts_Purchased', width: 20 },
      ];
  
      let serialNumber = 1;
  
      for (const owner of accountOwners) {
        try {
          const userSubscription = await UserSubscription.findOne({ userId: owner._id, isDeleted: false })
          let productName = "-", productPrice = "-";
          if(userSubscription?.responseJSON?.metadata) {
            const line_items = JSON.parse(userSubscription.responseJSON.metadata.items)
            const price = await stripe.prices.retrieve(line_items[0].price)
            const product = await stripe.products.retrieve(price.product)
            productName = product.name;
            productPrice = price.unit_amount;
          }
          worksheet.addRow({
            SNO: serialNumber++, 
            Name: owner.firstName + " " + owner.lastName, 
            Email_ID: owner.email,
            Contact_No: owner.contactNo || "-",
            Registration_Date: owner.createdAt.toISOString().split('T')[0],
            Subscription_Start_Date: userSubscription ? userSubscription.startDate : "-",
            Subscription_End_Date: userSubscription ? userSubscription.endDate : "-",
            Product_Name: productName,
            Product_Price:  productPrice,
            Total_Payment: userSubscription ? userSubscription.planTotalPrice : "-",
            Accounts_Purchased: userSubscription ? userSubscription.noOfHealthCareProvider : "-"
          });
        } catch (error) { 
          console.error('Error retrieving subscription:', error);
        
        }
      }
      worksheet.autoFilter = {
        from: 'A1',
        to: 'C1',
      };
      const filePath = path.join(__dirname, "../../../public/uploads/file/accountOwners.xlsx");
      await workbook.xlsx.writeFile(filePath);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('accountOwners.xlsx')}`);
      res.sendFile(filePath);
    } catch (error) {
      console.error('Export error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async exportsProviders(req, res) {
    const { startDate, endDate } = req.query;
    const filter = {};
    if(startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        $lt: new Date(`${endDate}T23:59:59.999Z`).toISOString()
      }
    }
    try {
      const allProviders = await Provider.find(filter).populate([
        { path: "userId", model: "user"},
        { path: "createdBy", model: "user"}
      ]).sort({ createdAt: -1 });
      console.log(allProviders.length, "Providerss")
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');
      worksheet.columns = [
        { header: 'S.NO', key: 'SNO', width: 10 }, 
        { header: 'Name', key: 'Name', width: 30 }, 
        { header: 'Email ID', key: 'Email_ID', width: 40 },
        { header: 'Registration Date', key: 'Registration_Date', width: 20 }, 
        { header: 'Subscription Start Date', key: 'Subscription_Start_Date', width: 20 },
        { header: 'Subscription End Date', key: 'Subscription_End_Date', width: 20 },
        { header: 'Account Owner Name', key: 'linked_accountOwner', width: 20 },
      ];
      let serialNumber = 1;
      try {
       for(const provider of allProviders) {
        let linkedAccountOwner = "-", subscriptionEndDate = "-"
        if (provider.createdBy && provider.createdBy.firstName && provider.createdBy.lastName) {
          linkedAccountOwner = provider.createdBy.firstName + " " + provider.createdBy.lastName;
          const userSubscription = await UserSubscription.findOne({ userId: provider.createdBy })
          subscriptionEndDate = userSubscription.endDate.toISOString().split('T')[0]
        }
        worksheet.addRow({
          SNO: serialNumber++, 
          Name: provider.userId.firstName + " " + provider.userId.lastName, 
          Email_ID: provider.userId.email,
          Registration_Date: provider.createdAt.toISOString().split('T')[0],
          Subscription_Start_Date: provider.createdAt.toISOString().split('T')[0],      
          Subscription_End_Date: subscriptionEndDate,
         linked_accountOwner: linkedAccountOwner
        });
       }
       worksheet.autoFilter = {
        from: 'A1',
        to: 'C1',
      };
      const filePath = path.join(__dirname, "../../../public/uploads/file/providers.xlsx");
      await workbook.xlsx.writeFile(filePath);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('providers.xlsx')}`);
      res.sendFile(filePath);
      } catch(error) {
        console.error('Error retrieving subscription:', error);
      }
    }catch(error) {
      console.error('Export error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async exportsPatients(req, res) {
    const { startDate, endDate } = req.query, filter = {};
    if(startDate && endDate) {
     filter.createdAt = {
      $gte: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
      $lt: new Date(`${endDate}T23:59:59.999Z`).toISOString()
     }
    }
    try {
      const allPatients = await Patient.find(filter).sort({ createdAt: -1 });
      console.log(allPatients.length, "Length")
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');
      worksheet.columns = [
        { header: 'S.NO', key: 'SNO', width: 10 },
        { header: 'Patient ID', key: 'Patient_Id', width: 30 },
        { header: 'Gender', key: 'Gender', width: 40 },
        { header: 'Age', key: 'Age', width: 20 },
        { header: 'Symptoms', key: 'Symptoms', width: 20 },
        { header: 'Diagnoses', key: 'Diagnoses', width: 20 },
        { header: 'Treatment Name', key: 'Treatment_Name', width: 20 },
        { header: 'Treatment Status', key: 'Treatment_Status', width: 20 },
      ];
  
      let serialNumber = 1;
  
      for (const patient of allPatients) {
        const dob = moment(patient.dob, 'YYYY-MM-DD');
        const age = moment().diff(dob, 'years');
  
        const consultations = await Consultation.find({ patientId: patient._id });
        const consultationIds = consultations.map(consultation => consultation._id);
  
        const symptoms = await Symptom.find({ consultationId: { $in: consultationIds } });
        const symptomList = symptoms.map(symptom => symptom.symptom).join(', ');
  
        let diagnosesList = [];
        let treatmentNamesList = [];
        let treatmentStatus;  
  
        for (const consultationId of consultationIds) {
          const examination = await Examination.findOne({ consultationId });
  
          if (examination && examination.diagnoses) {
            const { additionalDxs, bone, diagnose, osteopathic } = examination.diagnoses;
  
            if (additionalDxs.length > 0) {
              diagnosesList.push(...additionalDxs.map(dx => `${dx.name}: ${dx.value}`));
            }
  
            if (bone.length > 0) {
              diagnosesList.push(...bone.map(dx => `${dx.name}: ${dx.value}`));
            }
  
            if (diagnose.length > 0) {
              diagnosesList.push(...diagnose.map(dx => `${dx.name}: ${dx.value}`));
            }
  
            if (osteopathic.length > 0) {
              diagnosesList.push(...osteopathic.map(dx => `${dx.name}: ${dx.value}`));
            }
          }
  
          if (examination && examination.treatments && examination.treatments.shoulderOption) {
            const shoulderOptions = examination.treatments.shoulderOption;
            shoulderOptions.forEach(option => {
              const { left, leftValue, right, rightValue } = option;
              treatmentNamesList.push(`${left}: ${leftValue}, ${right}: ${rightValue}`);
            });
          }
          
          if(examination) {
            const visitComparison = await calculateVisitComparison(examination)
            treatmentStatus = visitComparison.progress;
          }
              
        }

        const diagnoses = diagnosesList.join(', ');
        const treatmentNames = treatmentNamesList.join(', ');
  
        worksheet.addRow({
          SNO: serialNumber++,
          Patient_Id: patient ? patient.fileNo : "-",
          Gender: patient ? patient.gender : "-",
          Age: age.toString(),
          Symptoms: symptomList,
          Diagnoses: diagnoses,
          Treatment_Name: treatmentNames,
          Treatment_Status: treatmentStatus
        });
      }
  
      worksheet.autoFilter = {
        from: 'A1',
        to: 'C1',
      };
  
      const filePath = path.join(__dirname, "../../../public/uploads/file/patients.xlsx");
      await workbook.xlsx.writeFile(filePath);
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('patients.xlsx')}`);
      res.sendFile(filePath);
    } catch (error) {
      console.error('Export error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } 


 
  

}

module.exports = new AuthController();