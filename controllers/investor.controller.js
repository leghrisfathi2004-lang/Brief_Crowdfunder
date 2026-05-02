const project = require('../utils/models/project.module.js');
const investment = require('../utils/models/investment.module.js');
const user = require('../utils/models/user.module.js');

const RES = require('../middleware/respond.js');
const err = require('../service/errShaper.service.js');
const checkingForInvesting = require('../service/investing.service.js');

const { projectInvestors } = require('../service/project.service.js');
const { InvestorPortfolio } = require('../service/portfolio.service.js');

// POST /api/investor/investing?projectId=*****&amount=***
const investing = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { projectId } = req.query;
    const amount = Number(req.query.amount);

    if (!projectId || !amount || amount <= 0) {
      return next(new err(400, 'Project ID and a positive amount are required.'));
    }

    const PROJECT = await project.findById(projectId);
    if (!PROJECT || PROJECT.status !== 'open')
      return next(new err(400, 'Project not found, or its closed.'));

    const investor = await user.findById(id);
    if (investor.balance < amount) {
      return next(new err(400, `Insufficient balance. Your balance: ${investor.balance}.`));
    }

    const flag = await checkingForInvesting(PROJECT, investor, amount, next);
    if (!flag) return;

    investor.balance -= amount;
    PROJECT.amount += amount;

    if (PROJECT.amount >= PROJECT.capital) {
      PROJECT.status = 'close';
    }

    await PROJECT.save();
    await investor.save();
    await investment.create({ investorId: id, projectId, amount });

    RES(res, 201, 'Investment successful.', {
      "project Id": projectId,
      "amount Invested": amount,
      "project Status": PROJECT.status,
      "remaining Capital": PROJECT.capital - PROJECT.amount,
      "your Balance": investor.balance
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/investor/balance?amount=****
const addBalance = async (req, res, next) => {
  try {
    const id = req.user.id;
    const amount = Number(req.query.amount);
    if (!amount || amount <= 0) {
      return next(new err(400, 'Amount must be positive.'));
    }
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { $inc: { balance: amount } },
      { new: true }
    );

    RES(res, 200, `Balance topped up by ${amount}.`, { balance: updatedUser.balance });
  } catch (error) {
    next(error);
  }
};

// GET /api/investor/projects/open
const getOpenProjects = async (req, res, next) => {
  try {
    const projects = await project.find({ status: 'open' })
      .populate('ownerId', 'name')
      .sort('-createdAt');
    RES(res, 200, 'success', { count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// GET /api/investor/projects?id=****
const getProjects = async (req, res, next) => {
  try {
    const prj = await project.findById(req.query.id).populate('ownerId', 'name email');

    if (!prj)
      return next(new err(404, 'Project not found.'));

    RES(res, 200, 'success', prj);
  } catch (error) {
    next(error);
  }
};

// GET /api/investor/portfolio
const getMyInvestments = async (req, res, next) => {
  try {
    const investorId = req.user.id;
    const investments = await InvestorPortfolio(investorId);
    RES(res, 200, 'success', investments);
  } catch (error) {
    next(error);
  }
};


module.exports = { addBalance, getOpenProjects, getProjects, investing, getMyInvestments };
