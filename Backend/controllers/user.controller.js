const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
let userRouter = express.Router();
const transporter = require("../transpoerter");
const { JWT_SECRET } = require("../../config");
userRouter.post("/register", async (req, res) => {
  const { name, email, tag, code, number } = req.body;

  try {
    let isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    let password =
      name.toLowerCase().split(" ")[0] +
      Math.floor(Math.random() * 10000) +
      "@" +
      code;
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      tag: tag,
      code: code,
      mobile: number,
    });

    // await user.save();
    // Send OTP via email
    const mailOptions = {
      from: "bikkuchi@gmail.com",
      to: email,
      subject: "Your Login Password",
      text: `Your Login Password is ${password}`,
    };

    //  Send The password To the User email
    transporter.sendMail(mailOptions, async  (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Error sending Password" });
      }
      await user.save();
      return res.status(200).json({
        message: "User created successfully and password sent to your email",
        success: true,
        user: user,
      });
    });
    // Return The Response
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token: token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = userRouter;
