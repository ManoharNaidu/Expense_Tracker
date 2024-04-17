const nodemailer = require("nodemailer");

const sendEmail = async (email, name) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ea1db76abbbb8d",
      pass: "1bb2cad774bab3",
    },
  });

  await transport.sendMail({
    to: email,
    from: "info@expensetracker.com",
    subject: "Welcome to Expense Tracker",
    text: `Hello ${name}, Welcome to Expense Tracker.`,
  });
};

module.exports = sendEmail;
