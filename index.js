const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { PORT } = require('./config');
const connectDB = require('./Backend/config/db');
const transporter = require('./Backend/transpoerter');
require("dotenv").config(); // Load environment variables from .env file
const app = express();
app.use(bodyParser.json());
app.use(cors());


// Route Use
app.use('/api/v1', require('./Backend/controllers/user.controller'));


// Configure Nodemailer
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'bikkuchi@gmail.com',  // Your email address
//         pass: 'fyda ufpa aztp mkvf',   // Your email password or app-specific password
//     },
// });

// Simulate OTP generation
let generatedOtp = '';

app.post('/api/send-otp', (req, res) => {
    const { email } = req.body;
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP via email
    const mailOptions = {
        from: 'bikkuchi@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${generatedOtp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error sending OTP' });
        }
        res.json({ success: true, message: 'OTP sent successfully' });
    });
});

app.post('/api/verify-otp', (req, res) => {
    const { otp } = req.body;
    if (otp === generatedOtp) {
        res.json({ success: true, message: 'OTP verified successfully!' });
    } else {
        res.json({ success: false, message: 'Invalid OTP. Please try again.' });
    }
});

app.listen(PORT, async() => {
    try {
        console.log(`Server running on port ${PORT}`);
        await connectDB();
    } catch (error) {
        console.error('%cError:', 'color: red;', error);
    }
});


module.exports = transporter