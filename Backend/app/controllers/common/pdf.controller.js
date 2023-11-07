const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const patientInvoiceObj = require("../../model/patientBilling");
const UserValidator = require("../../validators/user.validator");
const message = require("../../messages/messages");
const BadRequestError = require("../../errors/BadRequestError");
const moment = require("moment");
const { PORT } = process.env;
const nodemailer = require("nodemailer");





class pdfController {


   async createBillingPdf(req, res) {

      const { id } = UserValidator.validateObjectId(req.query.id);
      let billingData = await patientInvoiceObj.findById({ _id: id }).populate("patientId");
      // console.log(billingData, "Sataaa");
      let { email } = req.query;
      if (billingData) {
         try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`http://localhost:${PORT}/api/v1/common/pdf/patient/billingHtml?id=${id}`, {
               waitUntil: 'networkidle2',
            });
            // create a pdf document:-
            const pdfPath = `./public/uploads/file/${billingData?.patientId?.firstName}_${billingData?.patientId?.lastName}_${moment(billingData?.createdAt).format("YYYY-MM-DD")}.pdf`
            await page.pdf({
               path: pdfPath,
               format: "A4",
               printBackground: true
            })
            //   console.log(billingData, "createDocsss")
            // console.log(pdfPath)
            await browser.close();
            if (email) {
               const transporter = nodemailer.createTransport({
                  // Configure your email provider here
                  service: 'gmail',
                  auth: {
                     user: 'intellispine.csc@gmail.com',
                     pass: 'bwdrzztzucdmhwen'
                  }
               });
               const filePath = path.join(__dirname, '../../../views/patientPdfService.hbs');
               const source = fs.readFileSync(filePath, 'utf-8').toString();
               const template = handlebars.compile(source);
               const data = {
                  userName: billingData.patientId.salutation + " " + billingData.patientId.firstName + " "
                     + billingData.patientId.lastName
               }
               // console.log(data, "datasdf")
               const htmlToSend = template(data);
               const mailOptions = {
                  from: 'intellispine.csc@gmail.com', // sender address
                  to: `${billingData.patientId.email}`, // list of receivers
                  subject: 'Billing PDF', // Subject line
                  html: htmlToSend,
                  attachments: [
                     {
                        filename: 'billing.pdf',
                        path: pdfPath
                     }
                  ]
               };
               transporter.sendMail(mailOptions, function (err, info) {
                  if (err)
                     console.log(err)
                  else
                     console.log(info);
               })
               res.status(200).send({ message: "Bill is sent to patient email id" })
            } else {
               res.download(`./public/uploads/file/${billingData?.patientId?.firstName}_${billingData?.patientId?.lastName}_${moment(billingData?.createdAt).format("YYYY-MM-DD")}.pdf`)
            }
         } catch (err) {
            console.log(err, "Erroror")
         }
      } else {
         throw new BadRequestError(message.exportsPdf.notFound)
      }
   }


   async billingHtml(req, res) {
      const { id } = req.query;
      let data = await patientInvoiceObj.findById({ _id: id }).populate("patientId")
      //  console.log(data.createdAt, "datasdfasdfssa")
      let billingData = JSON.parse(JSON.stringify(data));
      console.log(billingData)
      return res.render("index.hbs", { moment: moment, billingData: billingData })
   }


}


module.exports = new pdfController()

