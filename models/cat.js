const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let catSchema = new Schema(
    {
        name: {type: String, required: true},
        age: {type: Number, required: true},
        color: {type: String, required:false},
        description: {type: String, required:false},
        price: {type: Number,required:true},
        inStock: {type: Boolean,required:true}
    }
);

// Define the object and its properties in the schema 

module.exports = mongoose.model("cat", catSchema);