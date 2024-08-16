const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bikkuchi@gmail.com',  // Your email address
        pass: 'fyda ufpa aztp mkvf',   // Your email password or app-specific password
    },
});


module.exports = transporter;