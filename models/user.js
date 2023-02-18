const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = Schema(
{
    username: {type: String, required: true, min: 4, max:10},
    name: {type: String, required: false, min: 4, max:50},
    email: {type:String, required: true, min: 6, max:255},
    password: {type:String, required: true, min: 8, max:255},
    creationDate: {type:Date, default: Date.now }
}

);

module.exports = mongoose.model("user", userSchema);