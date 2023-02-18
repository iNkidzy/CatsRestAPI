const router  = require("express").Router();
const user = require("../models/user");


//Routes for registration, login 

router.post("/signup", async(req,res) => {
   
    //code
   
    //validate user input (username,email,password,name?)

    //check if email already exists

    //hash password 

    //create a user object and save in db



    return res.status(200).json({msg: "Register route"});

});

router.post("/login", async(req,res) => {
    //
    return res.status(200).json({msg: "Login route"});
});

module.exports = router;