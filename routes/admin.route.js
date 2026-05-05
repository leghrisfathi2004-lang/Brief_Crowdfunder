const express = require('express');
const adminRT = express.Router();

//------ middleware ------
const adminAuth = require('../middleware/authentication/admin.auth');

//------ controller ------
const { getAllInvestors, getAllOwners, getInvestorPortfolio, getOwnerPortfolio } = require('../controllers/admin.controller');

adminRT.get('/investors', adminAuth, getAllInvestors);

adminRT.get('/owner', adminAuth, getAllOwners);

adminRT.get('/investor/:id/portfolio', adminAuth, getInvestorPortfolio);

adminRT.get('/owner/:id/portfolio', adminAuth, getOwnerPortfolio);

module.exports = adminRT;
