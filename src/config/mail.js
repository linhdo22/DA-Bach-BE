const nodemailer = require("nodemailer");
const { email } = require("./config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email.user,
    pass: email.password,
  },
});

const sendMail = ({ from = email.user, to, subject, text }) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({ from, to, subject, text }, (err, info) => {
      if (err) {
        return reject(err);
      }
      return resolve(info);
    });
  });
};

exports.emailService = { sendMail };
