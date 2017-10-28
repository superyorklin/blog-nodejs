var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.yeah.net',
    port: 465,
    auth: {
        user: 'york_lin@yeah.net',
        pass: 'lyz31415926'
    }
});

module.exports = transporter;