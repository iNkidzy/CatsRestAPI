const router  = require("express").Router();
const user = require("../models/user");
const { signupValidation } = require("../validation");


//Routes for registration, login 

router.post("/signup", async(req,res) => {
   
    //code
   
    //validate user input (username,email,password,name?)
    const {error} = signupValidation(req.body);
    
    if(error) {
        return res.status(400).json({error: error.details[0].message });
    }

    //check if email already exists
    const duplicateEmail = await user.findOne({email: req.body.email});

    if(duplicateEmail){
        return res.status(400).json({error: "Error: Email already exists!" });
    }

    //hash password 
    //const salt = await 
    
    //create a user object and save in db



    return res.status(200).json({msg: "User registered successfully!!!"});

});

router.post("/login", async(req,res) => {
    //
    return res.status(200).json({msg: "Success!! Login success!!"});
});

module.exports = router;