const message = require("../../messages/messages");
const Wallet = require("../../model/patientWallet");
const Patient = require("../../model/Patient");

const BadRequestError = require("../../errors/BadRequestError");
const NotFoundError = require("../../errors/NotFoundError");

class patientWalletController {

    async createAndUpdate (req, res) {
        const { patientId, walletAmount } = req.body;
        const patient = await Patient.findOne({ _id: patientId, isActive: true })
         
        if(!patient) throw new BadRequestError({ message: message.patient.notFound })
        let existedWallet = await Wallet.findOne({ isDeleted: false, patientId })
        if(existedWallet) {
            existedWallet.walletAmount = walletAmount + existedWallet.walletAmount;
            existedWallet.save();
            return res.status(201).send({ message: message.wallet.update, wallet: existedWallet });
        } else {
          const wallet = await Wallet.create({ ...req.body });
            return res.status(201).send({ message: message.wallet.create, wallet });
        }
    }


    async getWalletByPatientId(req, res) {
      const { id: patientId } = req.query;
      const getWallet = await Wallet.findOne({ isDeleted: false, patientId })
      if(!getWallet) {
        return res.status(201).send({ message: message.wallet.notFound, wallet: {}})
      }
      return res.status(201).send({ message: message.wallet.byId, wallet: getWallet})
    }
    


}

module.exports = new patientWalletController()