const project = require('../../utils/models/project.module.js');
const err = require('../../service/errShaper.service.js');

const ownerGuard = async (req, res, next) => {
    try{
        const ownerId = req.user.id;
        const id = req.params.id;
        const valid = await project.find({_id: id, ownerId});
        if(!valid || valid.length === 0)
            return next(new err(400, "wrong project Id!"));
        next();
    } catch(e) {
        next(e)
    }
}

module.exports = ownerGuard;
