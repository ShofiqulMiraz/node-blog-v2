const nodemailer = require("nodemailer");

const sendEmailWithResetToken = async (option) => {
  // create a transporter
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "265fd262561863",
      pass: "040e1504a3a84b",
    },
  });
  //   define the option

  const mailOption = {
    from: "Shofiqul Islam Miraz <simiraz90@gmail.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
    // html:
  };

  // send the email to request email
  await transport.sendMail(mailOption);
};

module.exports = {
  sendEmailWithResetToken,
};
