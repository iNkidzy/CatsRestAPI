const router  = require("express").Router();
const User = require("../models/user");
const { signupValidation, loginValidation } = require("../validation");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Routes for registration, login 

router.post("/signup", async(req,res) => {

   
    //validate user input (username,email,password,name?)
    const {error} = signupValidation(req.body);
    
    if(error) {
        return res.status(400).json({error: error.details[0].message });
    }

    //check if email already exists
    const duplicateEmail = await User.findOne({email: req.body.email});

    if(duplicateEmail){
        return res.status(400).json({error: "Error: Email already exists!" });
    }

    //hash password 
    const salt = await bcrypt.genSalt(10); //generate Salt using bcrypt, to be applied: x rounds.
    const password = await bcrypt.hash(req.body.password, salt); //generate a hash based on the pass we get from req + the salt

    //create a user object and save in db
    const newUser = new User({
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

router.post("/login", async (req,res) => {
    
    //validate login info
    const {error} = loginValidation(req.body); 

    if(error) {
        return res.status(400).json({error: error.details[0].message });
    }

    //if valid ,find user based on email/username
    const user = await User.findOne({username: req.body.username});

    if(!user){
        return res.status(400).json({error: "Error: User doesn't exist!" });
    }

    //user exists - check password 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    
    if(!validPass){
        return res.status(400).json({error: "Error: Incorrect password" });
    }
    
    
    // create auth token with username and id 
    //create token
    const token = jwt.sign( //not sing but sign :D 
        //payload
        {
            username: user.name, //username
            id: user._id
        },
        //TOKEN_SECRET in .env
        process.env.TOKEN_SECRET,
        //Expiration time in .env
        { expiresIn: process.env.JWT_EXPIRES_IN},

    )

    // attach  auth token to header
        res.header("auth-token", token).json({
            error: null,
            data: {token}
        });
    });

module.exports = router;