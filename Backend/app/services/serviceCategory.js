const DataService = require("./data.service");
const serviceCategorySchema = require("../model/serviceCategory");

class serviceCategory extends DataService {
 
    async create (categoryObj) {
        const serviceCategory = new serviceCategorySchema(categoryObj);
        // console.log(room, "roommmm")
        return await serviceCategory.save();
    }

    async all(filter) {
        // console.log(filter, "fitlererreerer")
        return await serviceCategorySchema.find(filter).sort({ createdAt: -1 })
      }


      async update(id, update) {
        return await this.findByIdAndUpdate(serviceCategorySchema, id, update,);
      }


      async delete(id, filter) {
        // console.log(filter)
        return await serviceCategorySchema.findByIdAndUpdate(id, filter)
      }
    
}


module.exports = new serviceCategory()