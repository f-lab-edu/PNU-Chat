import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
  service: 'GMail',
  port: 587,
  host: 'smtp.gmail.com',
  secure: true,
  requireTLS: true,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

export default mailer;
