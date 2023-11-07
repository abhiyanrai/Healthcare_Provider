const nodemailer = require("nodemailer");
const path = require("path")
// const mandrillTransport = require('nodemailer-mandrill-transport');
const handlebars = require('hbs');
// const { promisify } = require('util');
const fs = require('fs');
// const readFile = promisify(fs.readFile);
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('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')
class EmailService {
  // constructor() {
  //   this.transport = nodemailer.createTransport(mandrillTransport({
  //     auth: {
  //       apiKey: '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'
  //     }
  //   }));
  // }

  async password(password, userObj, ownerObj) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'intellispine.csc@gmail.com',
        pass: 'bwdrzztzucdmhwen',
      }
    });
    const filePath = path.join(__dirname, '../../views/email.hbs');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const data = {
      username: userObj.firstName,
      email: userObj.email,
      password: password,
      createdOwner: ownerObj.firstName
     };
  const htmlToSend = template(data);  
  // console.log(htmlToSend, "htmlTOSenddd")
    const mailOptions = {
      from: 'intellispine.csc@gmail.com', // sender address
      to: `${userObj.email}`, // list of receivers
      subject: 'test mail', // Subject line
      html: htmlToSend
    };  

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    })
  }


  async resetPassword(password, email) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'intellispine.csc@gmail.com',
        pass: 'bwdrzztzucdmhwen',
      }
    });
    const filePath = path.join(__dirname, '../../views/resetPassword.hbs');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const data = {
      email: email,
      password: password,
     };
  const htmlToSend = template(data);  
  // console.log(htmlToSend, "htmlTOSenddd")
    const mailOptions = {
      from: 'intellispine.csc@gmail.com', // sender address
      to: `${email}`, // list of receivers
      subject: 'test mail', // Subject line
      html: htmlToSend
    };  

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    })
  }

  async otp(otp, to) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'intellispine.csc@gmail.com',
        pass: 'bwdrzztzucdmhwen',
      }
    });
    const mailOptions = {
      from: 'intellispine.csc@gmail.com', // sender address
      to: `${to}`, // list of receivers
      subject: 'test mail', // Subject line
      html: `<h1>your otp is ${otp}</h1>`// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    })
  }

  async sendVerificationMail() {
    await this.transport.sendMail({
      from: "hardik@yopmail.com",
      to: "nikhil@yopmail.com",
      subject: "TEST",
      text: "Hi Nikhil",
      html: "<a href='www.google.com'>Go to Google!</a>"
    })
    console.log("message sent");
  }

  // async sendgrid() {

  //   const msg = {
  //     from: "hardik@yopmail.com",
  //     to: "nikhil@yopmail.com",
  //     subject: "TEST",
  //     text: "Hi Nikhil",
  //     html: "<a href='www.google.com'>Go to Google!</a>"
  //   }
  //   sgMail
  //     .send(msg)
  //     .then((response) => {
  //       console.log(response[0].statusCode)
  //       console.log(response[0].headers)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

}

module.exports = new EmailService();