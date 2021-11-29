var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

//http://localhost:5000/profiles/sign-up
router.post("/sign-up", (req, res, next) => {
    //res.send("Email sent");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tnguyendung.x1@gmail.com",
        pass: "gorxfwxxerwzefvd",
      },
    });
  
   const mailOptions = {
      from: "tnguyendung.x1@gmail.com",
      to: "dung@alinco.vn",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent: " + info.response);
      }
    });
  });

  router.post("/Sendmail2", async(req, res, next) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",//mail server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });

  module.exports = router;
