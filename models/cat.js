const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let catSchema = new Schema(
    {
        name: {type: String},
        age: {type: Number},
        color: {type: String},
        description: {type: String},
        price: {type: Number},
        inStock: {type: Boolean}
    }
);

// Define the object and its properties in the schema 

module.exports = mongoose.model("cat", catSchema);