const Joi = require('joi');

//--------------
const registerShema = Joi.object({
    name:     Joi.string().trim().required(),
    email:    Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role:     Joi.string().valid('owner', 'investor', 'admin').required()
});

const loginSchema = Joi.object({
    email:    Joi.string().email().required(),
    password: Joi.string().required()
});

//--------------
const addProjectShema = Joi.object({
    title:         Joi.string().trim().required(),
    description:   Joi.string().required(),
    capital:       Joi.number().positive().required(),
    percentMax:    Joi.number().min(1).max(100),
    initialInvest: Joi.number().min(0),
});

const updateProjectSchema = Joi.object({
    title:       Joi.string().trim(),
    description: Joi.string(),
    capital:     Joi.number().positive().required()
});

module.exports = { registerShema, loginSchema, addProjectShema, updateProjectSchema }
