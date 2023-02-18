const Joi = require('joi');
const jwt = require('jsonwebtoken');


// Validating registration
const signupValidation = (data) => {
    const schema = Joi.object(
        {
            username: Joi.string().min(4).max(10).required(),
            name: Joi.string().min(4).max(50),
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(8).max(255).required()
        });
    return schema.validate(data);
}

// Validating login

const loginValidation = (data) => {
    const schema = Joi.object(
        {
            username: Joi.string().min(4).max(10).required(),
            // email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(8).max(255).required()
        });
    return schema.validate(data);
}

//verify token (JWT)

const verifyToken = (req,res,next) => {
    const token = req.header("auth-token");

    if(!token){
        return res.status(401).json({error: "Access Denied"});
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch (error)
    {
        res.status(400).json({error: "Token is not valid"})
    }
}

module.exports = { signupValidation, loginValidation, verifyToken };