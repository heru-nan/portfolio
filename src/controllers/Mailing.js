import nodemailer from 'nodemailer';
import {google} from 'googleapis';
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

Mailing.sendEmail = (data, res) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });


  const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      requireTLS: false,
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken,
      },
    });
    const content = `<h2>${data.name}</h2><h3>${data.email}</h3><p>${data.message}</p>`;
 

  const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: SENDER_EMAIL_ADDRESS,
      subject: "Contact Me",
      html: content,
    };

  smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          res: err,
          error: 1
      })
      };
      return info;
    });
};

export default Mailing;