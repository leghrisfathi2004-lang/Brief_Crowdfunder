const project = require('../utils/models/project.module.js');
const investment = require('../utils/models/investment.module.js');
const mongoose = require('mongoose');


const InvestorPortfolio = async (id) => {
    const portfolio = await investment.aggregate([
        { $match: { investorId: new mongoose.Types.ObjectId(id) } },
        { $lookup: {
            from: 'projects',
            localField: 'projectId',
            foreignField: '_id',
            as: 'projectData'
        }},
        { $unwind: '$projectData' },
        { $project: {
            _id: 0,
            projectTitle: '$projectData.title',
            capital:       '$projectData.capital',
            status:        '$projectData.status',
            amountInvested:'$amount',
            percentage: {
                $round: [{ $multiply: [{ $divide: ['$amount', '$projectData.capital'] }, 100] }, 2]
            }
        }},
        { $group: {
            _id: null,
            investments:   { $push: '$$ROOT' },
            totalInvested: { $sum: '$amountInvested' }
        }}
    ]);
    return {
        investments: portfolio[0]?.investments || [],
        totalInvested: portfolio[0]?.totalInvested || 0
    };
};

const ownerPortfolio = async (id) => {
    const projects = await project.find({ ownerId: id }).sort('-createdAt');
    const totalRaised = projects.reduce((sum, p) => sum + p.amount, 0);
    return { projects, totalRaised };
};

module.exports = { ownerPortfolio, InvestorPortfolio };
