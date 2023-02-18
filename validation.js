const Joi = require('joi');


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

module.exports = { signupValidation, loginValidation };