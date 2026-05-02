const user = require('../utils/models/user.module');
const project = require('../utils/models/project.module');
const investment = require('../utils/models/investment.module');

const RES = require('../middleware/respond.js');

const err = require('../service/errShaper.service.js');
const { projectInvestors } = require('../service/project.service.js');
const { ownerPortfolio, InvestorPortfolio } = require('../service/portfolio.service.js');

// GET /api/admin/investors
const getAllInvestors = async (req, res, next) => {
    try{
        const investors = await user.find({ role: 'investor' }).select('-password').sort('name');
        RES(res, 200, 'success', investors);
    } catch (e) {
        next(e)
    }
};

// GET /api/admin/owner
const getAllOwners = async (req, res, next) => {
    try{
        const owners = await user.find({ role: 'owner' }).select('-password').sort('name');
        RES(res, 200, 'success', owners);
    } catch (e) {
        next(e)
    }
};


/*     |--------------- PORTFOLIO ---------------|     */


// GET /api/admin/investors/:id/portfolio
const getInvestorPortfolio = async (req, res, next) => {
  try {
    const id = req.params.id;
    const investor = await user.findOne({ _id: id, role: 'investor' }).select('-password');

    if (!investor) return next(new err(404, 'Investor not found.'));
    const portfolio = await InvestorPortfolio(id);

    RES(res, 200, 'success', { investor, portfolio });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/owner/:id/portfolio
const getOwnerPortfolio = async (req, res, next) => {
    try{
        const id = req.params.id;
        const Owner = await user.findOne({ _id: id, role: 'owner' }).select('-password');

        if (!Owner) return next(new err(404, 'owner not found.'));
        const portfolio = await ownerPortfolio(id);
        RES(res, 200, 'success', { Owner, portfolio });
    } catch(e) {
        next(e);
    }
};

module.exports = { getAllInvestors, getAllOwners, getInvestorPortfolio, getOwnerPortfolio };
