const DataService = require("./data.service");
const Service = require("../model/Services");
const SubService = require("../model/subService")

class serviceService extends DataService {
 
    async create (serviceName, serviceDescp, amount, subService, createdBy, categoryId) {
      let service  = new Service({
        serviceName,
        serviceDescp,
        categoryId,
        createdBy
      })
        let totalAmount = 0;
       if(subService.length > 0) {
        for(let i = 0; i < subService.length; i++) {
            const eachService = JSON.parse(JSON.stringify(subService[i]));
            const mySubService = new SubService({
              subServiceName: eachService.subServiceName,
              amount: eachService.amount,
              tax: eachService.tax,
              service: service._id,
              createdBy: createdBy
            })
            if(mySubService) {
              service.subService.push(mySubService._id);
              mySubService.save();
            }
            let taxAdded = 0;
            let totalAmountWithTax;
            if(eachService.tax && eachService.amount) {
                taxAdded = eachService.tax.reduce((acc, taxService) => {  
                            return acc + taxService.value;
                           }, 0)
            const taxPercentage = taxAdded / 100; 
            const taxValue = eachService.amount* taxPercentage;
            totalAmountWithTax = eachService.amount + taxValue;   
            }

          totalAmount = totalAmount + totalAmountWithTax;
        }
       } else {
         totalAmount = amount;
       }
       service.amount = totalAmount;
        return service.save()
    }

    async all (filter) {
        return await Service.find(filter).sort({createdAt: -1})
        .populate("categoryId")
        .populate("subService");
    }

    async update(id, update) {
    //    console.log(id, update, "idUpdateee")
       return await this.findByIdAndUpdate(Service, id, update)
    }

    async delete(id, filter) {
        // console.log(id, filter, "idfilterrrr")
        return await Service.findByIdAndUpdate(id, filter)
    }
    
}


module.exports = new serviceService()