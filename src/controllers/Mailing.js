

Mailing.sendEmail = async (data, res) => {
  await oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });


  const accessToken = await oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    const content = `<h2>${data.name}</h2><h3>${data.email}</h3><p>${data.message}</p>`;
    
  smtpTransport.verify(function(error, success) {
      if (error) {
        console.log("error transportador");
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

  const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: SENDER_EMAIL_ADDRESS,
      subject: "Contact Me",
      html: content,
    };

  await smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error sendEmail: ");
        console.log(err);
        res.status(500).json({
          res: err,
          error: 1
      })
      };
      console.log(info);

      return info;

    });
};

export default Mailing;