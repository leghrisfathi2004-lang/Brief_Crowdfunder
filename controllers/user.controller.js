const user = require('../utils/models/user.module');
const crypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const RES = require('../middleware/respond.js');
const handleErr = require('../middleware/errorHandler.js');
const err = require('../service/errShaper.service.js');

/*-------------------------------------------------------------*/


const register = async (req, res, next) => {
    try{
        const { name, email, password, role } = req.body;
        const exist = await user.findOne({ email });
        if (exist)
            return next(new err(409, "email already exist"));

        const hashPass = await crypt.hash(password, 10);
        await user.create({name, email, password: hashPass, role});
        return RES(res, 201, "register success!", { name, email, role});
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        const exist = await user.findOne({ email });
        if(!exist)
            return next(new err(422, "wrong password or email!"));

        const PassValid = await crypt.compare(password, exist.password);
        if(!PassValid)
            return next(new err(422, "wrong password or email!"));

        const token = jwt.sign({
            id: exist._id,
            name: exist.name,
            email: exist.email,
            role: exist.role
        }, process.env.jwt_code);

        return RES(res, 200, "login success!", { token });
    } catch (e) {
        next(e);
    }
}

module.exports = {login, register}
