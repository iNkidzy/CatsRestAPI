// Define dependencies 
const express = require("express");  
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
//import cat Routes file 
const catRoutes = require("./routes/cat");


// Get environment file 
require("dotenv-flow").config();

// parse request of content type json 
app.use(bodyParser.json()); //This wil be build in


mongoose.set('strictQuery', true); //Unsupported dependency warning remover MongoDB

//connecting to MongoDB
mongoose.connect(
    process.env.DBHOST,
    {
        useUnifiedTopology:true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once('open', () => console.log("Success: Connected to MongoDB"));

//Routes 

//Define routes directly here
app.get("/api/welcome", (req, res) => {
    res.status(200).send({message: "Welcome this is the Cat RestAPI using the MEN stack! :) "});
})

//for /api/cats include the catsRoutes file. 
 app.use("/api/cats", catRoutes);


//TODO: set app to listen to port and export modules

const PORT = process.env.PORT || 2300;

app.listen(PORT, function() {
    console.log("Server started on port:" + PORT);
});

module.exports = app;