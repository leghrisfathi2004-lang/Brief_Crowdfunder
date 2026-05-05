const express = require('express');
const userRT = express.Router();


//------ midlleware ------
const { registerShema, loginSchema } = require('../middleware/validation/schema');
const validate = require('../middleware/validation/validation');
const ownerGuard = require('../middleware/guard/owner.guard');

//------ controller ------
const { register, login }  = require('../controllers/user.controller');


userRT.post('/new', validate(registerShema), register);

userRT.post('/login', validate(loginSchema), login);


module.exports = userRT;