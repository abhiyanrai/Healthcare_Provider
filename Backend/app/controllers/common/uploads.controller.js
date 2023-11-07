const path = require("path");
const User = require("../../model/User");
const NotFoundError = require("../../errors/NotFoundError");
const UploadsValidator = require("../../validators/uploads.validator");
const csv = require('csv-parser');
const patientService = require("../../services/patient.service")
const patientValidator = require("../../validators/patient.validator")
const Patient = require("../../model/Patient")
const DropDownOption = require("../../model/dropdown_options")
const fs = require("fs")
const xlsx = require("xlsx")
const moment = require("moment");
const { create, uniq } = require("lodash");

function removeOptionalityFromKeys(obj) {
  const transformedObj = {};
  for (const key in obj) {
    const fieldName = key.replace(/\s*\(.*?\)\s*/g, '');
    transformedObj[fieldName] = obj[key];
  }
  return transformedObj;
}

class UploadsController {

  async file(req, res) {
    // const { id } = req.user; 
    // console.log(req.files.file, "12121")
    const file = req.files.file;
    const fileName = file.name.replaceAll(" ", "_");  
    let extension = path.extname(fileName);
    let { extension: ext } = UploadsValidator.validateImageExt(extension);
    const newFile = Date.now() + fileName;
    // console.log(newFile, "new ")
    file.mv("./public/uploads/file/" + newFile, async (err) => {
      if (!err) {
        return res.status(200).send({ message: "uploaded successfully", filePath: `uploads/file/${newFile}` });
      } else {
        // console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
      }
    });
  }


 
    async csvFile(req, res) {
      const { id: createdBy } = req.user;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
      }
      const file = req.files.file;
      var count = 0, skipData = false;
      const fileName = file.name.replaceAll(' ', '_');
      let extension = path.extname(fileName);
      let { extension: ext } = UploadsValidator.validateCsvPatient(extension);
      const newFile = Date.now() + fileName;
    
      file.mv('./public/uploads/file/' + newFile, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error uploading file');
        }
        const uniqueRecords = new Set();
        const filePath = './public/uploads/file/' + newFile;
        let results = [];
        let existingPatientCount = 0;
        if (ext === '.csv') {
          const stream = fs.createReadStream(filePath);
          
          stream.pipe(csv())
            .on('data', (data) => {
              const modifiedData = removeOptionalityFromKeys(data); 
              // console.log(modifiedData, "modifiedData")
              const { dob, firstName, lastName, salutation, gender, contactNo, registrationDate, email, address, zipcode, city } = modifiedData;
              const mandatoryFields = [dob, firstName, lastName, salutation, gender, contactNo];
              const optionalFields = [registrationDate, email, address, zipcode, city];
              const allMandatoryFieldsPresent = mandatoryFields.every(field => field !== undefined && field.trim() !== '');
              if(!uniqueRecords.has(data)) {
                uniqueRecords.add(data)
              }
              if (allMandatoryFieldsPresent) {
                const recordIdentifier = `${dob}_${firstName}_${lastName}_${salutation}_${gender}_${contactNo}`;
                if (!uniqueRecords.has(recordIdentifier)) {
                  uniqueRecords.add(recordIdentifier);
                for (const optionalField of optionalFields) {
                  if (optionalField === undefined) {
                    modifiedData[optionalField] = '';
                  } 
                }
              if(moment(modifiedData.dob, 'YYYY-MM-DD', true).isValid()) {
                results.push(modifiedData); 
              } else {
                skipData = true;
                count++
              }
              
              } else {  
                skipData = true;
                count++;
              }
              } else {
                skipData = true;
                count++;
              }
            })
            .on('end', async () => {
              const jsonData = JSON.parse(JSON.stringify(results));
              let promise = [];
              for (let i = 0; i < jsonData.length; i++) {
                const objData = jsonData[i];
                const {dob, firstName, lastName, salutation, gender, contactNo } = objData
                const existingPatient = await Patient.findOne({ dob, firstName, lastName, salutation, gender, contactNo });
                if (!existingPatient) {
                  const insertPatient = await patientService.create({ ...objData, createdBy });
                  promise.push(insertPatient);
                }
                else {
                  skipData = true;
                  existingPatientCount++;
                }
              }
              return res.status(200).send({
                message: skipData ? `Out of ${results.length + count}, ${results.length-existingPatientCount} data uploaded successfully` :
                  'Data uploaded and inserted successfully',
                patient: promise
              });
            });
        } else if (ext === '.xlsx') {

          const workbook = xlsx.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });
          jsonData.filter((data) => {
            const modifiedData = removeOptionalityFromKeys(data); 
            const { dob, firstName, lastName, salutation, gender, contactNo, registrationDate, email, address, zipcode, city } = modifiedData;
            const mandatoryFields = [dob, firstName, lastName, salutation, gender, contactNo];
            const optionalFields = [registrationDate, email, address, zipcode, city];

            const allMandatoryFieldsPresent = mandatoryFields.every(field => field !== undefined && field.trim() !== '');
            if (allMandatoryFieldsPresent) {
              const recordIdentifier = `${dob}_${firstName}_${lastName}_${salutation}_${gender}_${contactNo}`;        
              if (!uniqueRecords.has(recordIdentifier)) {
                uniqueRecords.add(recordIdentifier);
                for (const optionalField of optionalFields) {
                  if (modifiedData[optionalField] === undefined) {  
                    modifiedData[optionalField] = '';
                  }
                }
                if(moment(modifiedData.dob, 'YYYY-MM-DD', true).isValid()) {  
                  results.push(modifiedData); 
                } else {
                  skipData = true;
                  count++
                }
              } else {
                 skipData = true;
                 count++;
              }
            } else {
              skipData = true;
              count++;
            }
          })
          let promise = [];
          for (let i = 0; i < results.length; i++) {
            const objData = results[i]; 
            const { dob, firstName, lastName, salutation, gender, contactNo } = objData;
            const existingPatient = await Patient.findOne({ dob, firstName, lastName, salutation, gender, contactNo });
            if (!existingPatient) {
              const insertPatient = await patientService.create({ ...objData, createdBy });
              promise.push(insertPatient);
            }
            else {
              skipData = true;
              existingPatientCount++;
            }
          }
          return res.status(200).send({
            message: skipData ? `Out of ${results.length + count}, ${results.length-existingPatientCount} data uploaded successfully` :
            'All Data uploaded and inserted successfully',
            patient: promise
          });
        } else {
          return res.status(400).send('Unsupported file type');
        }
      });
    }



  async csvDiagnoses(req, res) {
    const { id: createdBy } = req.user;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded');
    }
    const file = req.files.file;
    const fileName = file.name.replaceAll(' ', '_');
    let extension = path.extname(fileName);
    let { extension: ext } = UploadsValidator.validateCsvDiagnoses(extension);
    const newFile = Date.now() + fileName;
    const dataFromCsv = [];
    file.mv("./public/uploads/file/" + newFile, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading file');
      }
      const filePath = './public/uploads/file/' + newFile;
      const stream = fs.createReadStream(filePath);
      const encounteredNames = new Set();
      // console.log(encounteredNames, "encountered")
      let count = 0;
      stream.pipe(csv())
      .on('data', (data) => { 
        if (!encounteredNames.has(data.Diagnoses)) {
          encounteredNames.add(data.Diagnoses);
          dataFromCsv.push(data);
        } else {                    
          count++;
        } 
      })
      .on('end', async () => {
        const existingNames = await DropDownOption.find({ name: { $in: [...encounteredNames] } }, 'name');
        const existingNameSet = new Set(existingNames.map((item) => item.name));
        const dropdownOptions = dataFromCsv.reduce((options, data) => {
          if (!existingNameSet.has(data.Diagnoses)) {
            options.push({
              name: data.Diagnoses,
              modelId: '63ff4e3ff0ef67428bd491d5', 
              createdBy,
            });
          }
          return options;
        }, []);
        try {
          if (dropdownOptions.length > 0) {
            await DropDownOption.insertMany(dropdownOptions);
          }
          res.status(200).send(`Out of ${dataFromCsv.length + count}, ${dropdownOptions.length} data inserted successfully`);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error inserting dropdown options');
        }
      })
    });
  }
  


}

module.exports = new UploadsController();