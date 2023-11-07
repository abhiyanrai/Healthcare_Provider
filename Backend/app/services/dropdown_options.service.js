const DataService = require("./data.service");
const DropDownOption = require("../model/dropdown_options");
const message = require("../messages/messages")
const NotFoundError = require("../errors/NotFoundError");

class dropdownOptionService extends DataService {

  async create(modelId, name, createdBy) {
     const dropdownOption = await DropDownOption.create({
      modelId, name, createdBy
     })
     return dropdownOption;
  }

//   async all (filter) {
//       return await DropDownOption.find(filter).sort({ createdAt: -1 });
//   }

   async update(id, update) {
     return await this.findByIdAndUpdate(DropDownOption, id, update,);
   }

   async delete(id, filter) {
    return await DropDownOption.findByIdAndUpdate(id, filter,{ new: true });
   }

}

module.exports = new dropdownOptionService();