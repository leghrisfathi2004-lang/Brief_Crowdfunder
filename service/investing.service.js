const investment = require('../utils/models/investment.module');
const err = require('../service/errShaper.service.js');

const checkingForInvesting = async (PROJECT, INVESTOR, amount, next) => {
    try{
        const remain = PROJECT.capital - PROJECT.amount;
        if(amount > remain)
            return next(new err(400, `Investment more than remaining capital. Maximum allowed: ${remain}.`));

        const oldInvestments = await investment.find({investorId: INVESTOR.id, projectId: PROJECT.id});
        const total = oldInvestments.reduce((sum, el) => sum + el.amount, 0) + amount;
        const maxAllowed = (PROJECT.percentMax / 100) * PROJECT.capital;
        if(maxAllowed < total)
            return next(new err(400, `With your old investments, max allowed: ${maxAllowed - (total - amount)}.`));
        return true;

    } catch(e) {
        next(e);
    }
}

module.exports = checkingForInvesting;
