const err = require('../../service/errShaper.service');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error)
        return next(new err(400, 'validation error'))
    next();
};

module.exports = validate;