const router  = require("express").Router();
const user = require("../models/user");
const { signupValidation } = require("../validation");
const bcrypt = require('bcrypt');


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
    const salt = await bcrypt.genSalt(10); //generate Salt using bcrypt, to be applied: x rounds.
    const password = await bcrypt.hash(req.body.password, salt); //generate a hash based on the pass we get from req + the salt

    //create a user object and save in db
    const newUser = new user({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await newUser.save();
        res.json({ error: null, data: savedUser._id });
    
    } catch (error) {
        res.status(400).json({ error });
    }

    // return res.status(200).json({msg: "User registered successfully!!!"});

});

router.post("/login", async(req,res) => {
    //
    return res.status(200).json({msg: "Success!! Login success!!"});
});

module.exports = router;