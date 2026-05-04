const jwt = require('jsonwebtoken');
const err = require('../../service/errShaper.service');

const investorAuth = (req, res, next) => {
    try{
        const head = req.headers.authorization;
        if(!head || !head.startsWith("Bearer"))
            return next(new err(401, 'login first!'));
        const tokenvalue = head.split(" ")[1];
        const decode = jwt.verify(tokenvalue, process.env.jwt_code);
        if(decode.role !== "investor")
            return next(new err(401, 'login require!'));
        //decode = {id: ****, name: ****, email: *****, expiresIn...}
        req.user = decode;
        next(); 
    } catch(e) {
        next(e)
    }
}

module.exports = investorAuth;