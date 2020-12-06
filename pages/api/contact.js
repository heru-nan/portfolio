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

export default async (req, res) => {
    if(req.method === "POST"){

        const data = req.body;

        await oauth2Client.setCredentials({
            refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
          });
          
        console.log(oauth2Client);
        const accessToken = await oauth2Client.getAccessToken();

        console.log(accessToken);
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

        smtpTransport.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({
                    res: err,
                    error: 1
                })
                };
                console.log(info);
                res.status(200).json({
                    res: "ok",
                    error: 0
                })
          
              });
    }
    else res.status(500).json({
        res: "Error, Ruta para request tipo POST solamente",
        error: 1
    })
    
}

export const config = {
    api: {
        externalResolver: true,
    }
}