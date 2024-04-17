const { MailtrapClient } = require("mailtrap");
const mail = (email, name) => {
  const TOKEN = process.env.MAILTRAP_TOKEN;
  const ENDPOINT = "https://send.api.mailtrap.io/";

  const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

  const sender = {
    email: "manu@demomailtrap.com",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "beesettim27@gmail.com",
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "5049c163-486c-4bc1-92a5-c9cb9c5a916e",
      template_variables: {
        user_name: name,
        next_step_link: "Test_Next_step_link",
        get_started_link: "Test_Get_started_link",
        onboarding_video_link: "Test_Onboarding_video_link",
      },
    })
    .then(console.log, console.error);
};

module.exports = mail;
