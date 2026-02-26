const nodemailer = require('nodemailer');

// email sender
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '493d691bad2c62',
        pass: '7ca8be31e88b40'
    }
});

const sendMail = async (to, subject, text) => {
    transporter.sendMail({
        to,
        subject,
        text
    });
};

module.exports = sendMail;


