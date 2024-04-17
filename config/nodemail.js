const nodemailer = require("nodemailer");

const sendEmail = async (email, name, ...options) => {
  if (!email) throw new Error("Email is required");
  if (!name) throw new Error("Name is required");
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  if (options.length > 0) {
    await transport.sendMail({
      to: email,
      from: "info@expensetracker.com",
      subject: "Reset Password Code",
      html: `<h1>Hello ${name}</h1><p>Your reset password code for Expense Tracker is <strong>${options[0]}</strong></p>`,
      // text: `Hello ${name}, Your reset password code for Expense Tracker ${options[0]}`,
    });
    return;
  }
  await transport.sendMail({
    to: email,
    from: "info@expensetracker.com",
    subject: "Welcome to Expense Tracker",
    text: `Hello ${name}, Welcome to Expense Tracker.`,
  });
};

module.exports = sendEmail;
