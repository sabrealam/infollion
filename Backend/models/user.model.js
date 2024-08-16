const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    tag : { type: String, required: true },
    code: { type: String, required: true },
    password: { type: String, required: true, default: "" },
    mobile: { type: String, required: true },

})


let User = mongoose.model("User", userSchema);
module.exports = User