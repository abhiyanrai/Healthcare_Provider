const DataService = require("./data.service");
const Provider = require("../model/Provider");
const message = require("../messages/messages")
const NotFoundError = require("../errors/NotFoundError");

class providerService extends DataService {

  async update(id, update) {
    return await this.findByIdAndUpdate(Provider, id, update, message.user.notExisted);
  }

  async all(filter, page, limit) {
    return await Provider.find(filter).limit(limit).skip(limit * (page - 1)).sort({ createdAt: -1 }).populate("userId")
  }


  async delete(id, filter) {
    return await Provider.findByIdAndUpdate(id, filter)
  }

}

module.exports = new providerService();