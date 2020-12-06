import nodemailer from 'nodemailer';
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const Mailing = {};

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);

Mailing.sendEmail = data => {
  console.log("1");
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });
  console.log("2");

  const accessToken = oauth2Client.getAccessToken();
  console.log("3");

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
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
    },
    debug: true
  });
  console.log("4");

  const content = `<h2>${data.name}</h2><h3>${data.email}</h3><p>${data.message}</p>`;

  const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: SENDER_EMAIL_ADDRESS,
      subject: "Contact Me",
      html: content,
    };
  smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("error smtpTransporter");
        return err;
      };
      console.log("ALl, Ok");
      return info;
    });
};

export default Mailing;