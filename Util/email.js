var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secureConnection: true,
    auth: {
        user: '459192633@qq.com',
        pass: 'vdgffltdlvrxbgdb'
    }
});

module.exports = transporter;