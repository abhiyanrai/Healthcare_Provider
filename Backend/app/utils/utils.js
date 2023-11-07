const path = require("node:path");
const fs = require("node:fs");
const user = require("../model/User")
const folder = "../../public/json/";
const dropdownModel = require("../model/dropdown_models");
const dropdownOption = require("../model/dropdown_options");

class utils {
   async dropdownDefaultOptions() {
        const describeSymp =
        [
            {"id": "1", "name": "Cervical/Thoracic/Lumbar Spine Syndrome"}, 
            {"id": "2", "name": "Muscular Pain"}, 
            {"id": "3", "name": "Mid-back Pain"}, 
            {"id": "4", "name": "Fixation of the Sacro-iliac Joint"},   
            {"id": "5", "name": "Paresthesia"}, 
            {"id": "6", "name": "Lateral Pelvic Tilt"}, 
            {"id": "7", "name": "Leg Length Difference"}, 
            {"id": "8", "name": "Muscle Cramping"},
            {"id": "9", "name": "Neck and shoulder pain caused by muscles"},
            {"id": "10", "name": "Headaches"}
        ]
        const dropdown_model = await dropdownModel.findOne({name: "DIAGNOSES: 1"});
        // console.log(dropdown_model,dropdown_model._id, "21212");
        if (dropdown_model) {
            const data = describeSymp.map(el => {
                return {name: el.name, modelId: dropdown_model._id, isDefault: true}
            })
            // console.log(data, "data");
            const dropdown_options = await dropdownOption.insertMany(data);
            // console.log(dropdown_options)
        }
    }



}



const util = new utils();

// util.dropdownDefaultOptions();
module.exports = util;