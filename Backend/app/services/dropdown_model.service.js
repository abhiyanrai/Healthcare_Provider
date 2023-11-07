const DataService = require("./data.service");
const DropDownModel = require("../model/dropdown_models");
const message = require("../messages/messages")
const NotFoundError = require("../errors/NotFoundError");

class dropdownModelService extends DataService {

  async create(dropdownObj) {
    const dropdownModel = new DropDownModel(dropdownObj);
    return await dropdownModel.save();
  }

  async all (filter) {
      return await DropDownModel.find(filter).sort({ createdAt: -1 });
  }

}

module.exports = new dropdownModelService();