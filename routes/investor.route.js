const express = require('express');
const investorRT = express.Router();

//------ middleware ------
const investorAuth = require('../middleware/authentication/investor.auth');

//------ controller ------
const { addBalance, getOpenProjects, getProjects, investing, getMyInvestments } = require('../controllers/investor.controller');

investorRT.post('/investing', investorAuth, investing);

investorRT.patch('/balance', investorAuth, addBalance);

investorRT.get('/projects/open', investorAuth, getOpenProjects);

investorRT.get('/projects', investorAuth, getProjects);

investorRT.get('/portfolio', investorAuth, getMyInvestments);

module.exports = investorRT;
