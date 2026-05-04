const jwt = require('jsonwebtoken');
const err = require('../../service/errShaper.service');

const adminAuth = (req, res, next) => {
    try{
        const head = req.headers.authorization;
        if(!head || !head.startsWith("Bearer"))
            return next(new err(401, 'login first!'));
        const tokenvalue = head.split(" ")[1];
        const decode = jwt.verify(tokenvalue, process.env.jwt_code);
        if(decode.role !== "admin")
            return next(new err(401, 'login require!'));
        next(); 
    } catch(e) {
        next(e)
    }
}

module.exports = adminAuth;