const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let catSchema = new Schema(
    {
        name: {type: String, required: true},
        age: {type: Number,required: true},
        color: {type: String,required: false},
        description: {type: String,required: false, min:3, max:255},
        price: {type: Number,required: true},
        inStock: {type: Boolean,required: true}
    }
);
catSchema.pre('findOneAndUpdate', function() {
    const update = this.getUpdate();
    if (update.__v != null) {
      delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
      if (update[key] != null && update[key].__v != null) {
        delete update[key].__v;
        if (Object.keys(update[key]).length === 0) {
          delete update[key];
        }
      }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
  });
// Define the object and its properties in the schema 

module.exports = mongoose.model("cat", catSchema);