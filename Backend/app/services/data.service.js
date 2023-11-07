const bcrypt = require("bcryptjs");
const { array } = require("joi");
const NotFoundError = require("../errors/NotFoundError");
const messgae = require("../messages/messages");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types;
const DropDownOption = require("../model/dropdown_options")

class DataService {

  async generateOtp(user) {
    let otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();
    user.otp = await bcrypt.hash(otp, 10);
    user = await user.save()
    return { user, otp };
  }

  async find(model, filter, message) {
    let docs = await model.find(filter);
    if (!docs.length) throw new NotFoundError(message);
    return docs;
  }

  async findByIdAndUpdate(model, id, update, message) {
    let doc = await model.findByIdAndUpdate(id, update, { new: true });
    if (!doc) throw new NotFoundError(message);
    return doc;
  }

  generatePassword() {
    let password = '';
    let capital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let small = 'abcdefghijklmnopqrstuvwxyz';
    let number = "012345678901234567890123456789";
    let special = "!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*";
    for (let i = 1; i <= 2; i++) {
      let char = Math.floor(Math.random()
        * capital.length + 1);
      password += capital.charAt(char) + small.charAt(char) + number.charAt(char) + special.charAt(char);
    }
    return password;
  }

  async generateFile(startDate, endDate) {
    let difference = endDate.getTime() - startDate.getTime();
    let count = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    return count;
  }

  async searchUsers(search, allData, flag) {
    // console.log(search, "{{{[")
    // console.log(allData, "kskdfk")
    if (!flag) {
      const splitName = search.split(" ")
      const firstName = splitName[0], lastName = splitName[1]
      const searchFirst = firstName.toLowerCase();
      const searchLast = lastName ? lastName.toLowerCase() : '';
      const result = allData.filter(user => {
        const userFirst = user.patientId.firstName.toLowerCase();
        const userLast = user.patientId.lastName ? user.patientId.lastName.toLowerCase() : '';
        return userFirst.includes(searchFirst) && userLast.includes(searchLast);
      });

      return result;
    } else {
      const splitName = search.split(" ")
      const firstName = splitName[0], lastName = splitName[1]
      const searchFirst = firstName.toLowerCase();
      const searchLast = lastName ? lastName.toLowerCase() : '';
      const result = allData.filter(user => {
        const userFirst = user.firstName.toLowerCase();
        const userLast = user.lastName ? user.lastName.toLowerCase() : '';
        return userFirst.includes(searchFirst) && userLast.includes(searchLast);
      });

      return result;
    }
  }


  async generateProgress(TotalCm, CmS, CmP) {
    let latestTotal = Number(CmS) + Number(CmP)
    if (latestTotal > TotalCm) {
      return { progress: messgae.visitDetail.worse, latestTotal };
    } else if (latestTotal < TotalCm) {
      return { progress: messgae.visitDetail.improved, latestTotal };
    } else {
      return { progress: messgae.visitDetail.noChange, latestTotal };
    }


  }


  async generateHolidays(clinicScheduleObj) {
    const holidays = [];
    clinicScheduleObj.holidays.forEach((holidayRange) => {
      const { startDate, endDate, name } = holidayRange;
      const currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        holidays.push({
          date: currentDate.toISOString().split('T')[0], 
          name,
        });
        currentDate.setDate(currentDate.getDate() + 1); 
      }
    });
    return holidays;
  }



  paginationFunc(data, page, limit) {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || data.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
  }


  async createDefaultDropdownOptions(user) {

    const defaultOptions = [
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Migrane" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Tinnitus / Tinitus" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Dizziness / Schwindel" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "SI joint pain / Ischiasschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Hip pain / Hüfteschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Leg pain /Oberschenkel schmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Knee pain / Knieschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Foot Pain / Füß Schmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Chest pain / Brustschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Lumbago / LWS" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "TMJ / CMD" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Neck pain / HW" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Shoulder pain / Schulterschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Wrist pain / Schmerzen der handgelenk" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Thoracic spine pain /BWS" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Acute low back / Hexenschuss" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Headaches / Kopfschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Elbow pain / Ellebogeschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Sciatica / Ischiasschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Calf pain / Unterschenkel warde(n)" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Heel pain / Fersenschmerzen" },
      { modelId: ObjectId("63f60f3d3bf7cc2e6d21ec56"), name: "Scoliosis / Skoliose" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Fingers 1,2,3" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Fingers 3,4,5" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Upper back" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Shoulder blades" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Lateral high" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Knee front" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Knee posterior" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Calf" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Shoulder" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Low back" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Buttocks" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Knee lateral" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Knee medial" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Head" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Lower arm" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Hand fingers" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Chest" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "From buttocks to foot/feet" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Posterior thigh" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Anterior thigh" },
      { modelId: ObjectId("63f60f5b3bf7cc2e6d21ec7b"), name: "Si joint" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Sharp" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Tingling" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Shooting" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Dull" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Burning" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Sensitive" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "An ache" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Numb" },
      { modelId: ObjectId("63f60f713bf7cc2e6d21ec9e"), name: "Sore" },
      { modelId: ObjectId("63f60f893bf7cc2e6d21ed08"), name: "Injury" },
      { modelId: ObjectId("63f60f893bf7cc2e6d21ed08"), name: "Insidious" },
      { modelId: ObjectId("63f60f893bf7cc2e6d21ed08"), name: "Accident" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Sports" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Working" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Running" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Walking" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Sitting" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Lifting" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Lying down" },
      { modelId: ObjectId("63f60f943bf7cc2e6d21ed0a"), name: "Rest" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Walking" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Sitting" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Lying down" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Running" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Sports" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Working" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Rest" },
      { modelId: ObjectId("63f60fa53bf7cc2e6d21ed0c"), name: "Lifting" },
      { modelId: ObjectId("63f60fb43bf7cc2e6d21ed0e"), name: "Osteoporosis" },
      { modelId: ObjectId("63f60fb43bf7cc2e6d21ed0e"), name: "No cervical manual!" },
      { modelId: ObjectId("63f60fb43bf7cc2e6d21ed0e"), name: "Disc herniation - Use disc protocols" },
      { modelId: ObjectId("63f60fb43bf7cc2e6d21ed0e"), name: "Scoliosis" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Family doctor / Hausarzt" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Orthopedist" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Chiropractor" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Heiplraktiker" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Psychologe" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Andere" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Osteopath" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Physiotherapeut" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Surgeon" },
      { modelId: ObjectId("63f60fc33bf7cc2e6d21ed10"), name: "Massage therapeut" },
      { modelId: ObjectId("63f60fcf3bf7cc2e6d21ed12"), name: "Yes" },
      { modelId: ObjectId("63f60fcf3bf7cc2e6d21ed12"), name: "A lot" },
      { modelId: ObjectId("63f60fcf3bf7cc2e6d21ed12"), name: "A little" },
      { modelId: ObjectId("63f60fcf3bf7cc2e6d21ed12"), name: "No" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Infraspinatous" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Supraspinatous" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Posterior Deltoid" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Teres Major & Minor" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Biceps brachialis" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Subscapularis" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Rhomboid" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Pectoralis Minor" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Trapezius" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Levator Scapulae" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Anterior Deltoid" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Medial Deltoid" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Latissimus Dorsi" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Triceps brachii" },
      { modelId: ObjectId("63ff4e2cf0ef67428bd491d3"), name: "Pectoralis Major" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M54.10 HWS-BWS-LWS_ Cervical/Thoracic/Lumbar Spine Syndrome" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M62.89  Muscular Pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M54.99  Mid-back Pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M99.84 ISG-Fixation of the Sacro-iliac Joint" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "R20.2  Paresthesia" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M95.5 Lateral Pelvic Tilt" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M21.79 Leg Length Difference" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M62.89  Muscle Cramping" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M62.81 Neck and shoulder pain caused by muscles" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "R51 Headaches" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M19.99 Arthrosus" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M17.9 Arthrosus of the knee joint" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M89.89 Bone pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M79.69 Extremity pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M41.99 Scoliosis" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "R52.0 Acute pain - non-specific" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M71.99 Bursitis" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M65.99 Tendon sheath inflammation" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M25.31 Shoulder instability" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M53.2  Spinal joint instability" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M79.29 Non-specific nerve pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M25.56 Knee pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M54.3 SI-Joint pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "M54.4 Lumbar/SI-Joint pain" },
      { modelId: ObjectId("63ff4e3ff0ef67428bd491d5"), name: "T73.3 Overexertion" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Ankle" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Shoulder" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Arch of foot" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Knee" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Elbow" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "T-Spine" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "L-Spine" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Legs" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Wrist" },
      { modelId: ObjectId("63ff4e68f0ef67428bd491db"), name: "Neck" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Twice per week" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Once per 2 weeks" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Once per month" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Once per 2 Months" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Dismissed" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Once per week" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Once per 3 Weeks" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "As needed" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "3X per week" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Once per quarter" },
      { modelId: ObjectId("63ff4e81f0ef67428bd491dd"), name: "Twice per year" },
      { modelId: ObjectId("63ff4ec5f0ef67428bd491df"), name: "RSUP" },
      { modelId: ObjectId("63ff4ec5f0ef67428bd491df"), name: "RANT" },
      { modelId: ObjectId("63ff4ec5f0ef67428bd491df"), name: "LANT" },
      { modelId: ObjectId("63ff4ec5f0ef67428bd491df"), name: "RLAT" },
      { modelId: ObjectId("63ff4ec5f0ef67428bd491df"), name: "LSUP" },
      { modelId: ObjectId("63ff4ec5f0ef67428bd491df"), name: "LLAT" },
      { modelId: ObjectId("63ff4edbf0ef67428bd491e1"), name: "PRS" },
      { modelId: ObjectId("63ff4edbf0ef67428bd491e1"), name: "PRI" },
      { modelId: ObjectId("63ff4edbf0ef67428bd491e1"), name: "PLI" },
      { modelId: ObjectId("63ff4edbf0ef67428bd491e1"), name: "PLS" },
      // { modelId: ObjectId("63ff4edbf0ef67428bd491e1"), name: "nbses" },

    ]

    const dropdownOptionsToInsert = defaultOptions.map(option => ({
      name: option.name,
      modelId: option.modelId,
      createdBy: user._id,
    }));
  
    await DropDownOption.insertMany(dropdownOptionsToInsert);
    // console.log(user._id, "user;;");
  }







}

module.exports = DataService;