const mongoose = require("mongoose");
const { MONGO_URI } = require("../../config");
require("dotenv").config();


const connectDB = async () => {
    try {
            let connection = await mongoose.connect(MONGO_URI);
            console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB