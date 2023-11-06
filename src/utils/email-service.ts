import nodemailer from 'nodemailer';
import { getRequiredEnvironmentVariables } from './get-required-environment-variables';

interface IEmailCredential {
   host: string;
   user: string;
   pass: string;
}

const credential: IEmailCredential = {
   host: process.env.EMAIL_HOST!,
   user: process.env.EMAIL_USERNAME!,
   pass: process.env.EMAIL_PASSWORD!,
}

class EmailService {
   private transporter: nodemailer.Transporter;

   constructor() {
      this.transporter = nodemailer.createTransport({
         host: credential.host,
         port: 587,
         auth: {
            user: credential.user,
            pass: credential.pass,
         },
      });
   }

   async sendVerificationEmail(email: string, token: string): Promise<boolean> {
      const requiredVariables = getRequiredEnvironmentVariables();
      const verifyUrl = `${requiredVariables.appUrl}/auth/verify/${token}`;

      const mailOptions = {
         from: '"Ardhian Hanum" <me@ardhian.com>',
         to: email,
         subject: 'Email Verification',
         // text: `Please click the following link to verify your email: ${verifyUrl}`,
         html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <style>
                  body {
                        font-family: Arial, sans-serif;
                  }
                  .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        text-align: center;
                  }
                  .header {
                        background-color: #3498db;
                        color: #fff;
                        padding: 10px;
                  }
                  .content {
                        padding: 20px;
                  }
                  .verify-button {
                        background-color: #3498db;
                        color: #fff !important;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                  }
               </style>
            </head>
            <body>
               <div class="container">
                  <div class="header">
                        <h1>Email Verification</h1>
                  </div>
                  <div class="content">
                        <p>Thank you for registering with our service. Please click the button below to verify your email address:</p>
                        <a class="verify-button" href="${verifyUrl}">Verify Email</a>
                        <p>If you did not create an account on our platform, you can safely ignore this email.</p>
                  </div>
               </div>
            </body>
            </html>
         `
      };

      try {
         await this.transporter.sendMail(mailOptions);
         return true;
      } catch (error) {
         console.error('Error sending verification email:', error);
         return false;
      }
   }
}

export const emailService = new EmailService();