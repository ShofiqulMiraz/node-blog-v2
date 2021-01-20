const nodemailer = require("nodemailer");

const sendEmailWithResetToken = async (option) => {
  // create a transporter
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_USER_PASSWORD,
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
