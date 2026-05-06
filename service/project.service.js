const project = require('../utils/models/project.module.js');
const investment = require('../utils/models/investment.module.js');
const user = require('../utils/models/user.module.js');

const mongoose = require('mongoose')

const RES = require('../middleware/respond.js');

const projectInvestors = async (id, capital) => {
    try {
        const investors = await investment.aggregate([
            { $match: { projectId: new mongoose.Types.ObjectId(id) } },

            { $lookup: {
                from: 'users',
                localField: 'investorId',
                foreignField: '_id',
                as: 'investors'
            }} ,

            { $unwind: '$investors' },

            { $group: {
                _id: '$investors._id',
                name: { $first: '$investors.name'},
                email: { $first: '$investors.email'},
                amount: { $sum: '$amount'},
                }
            }
        ]);
        
        return investors.map(el => ({
            ...el, percentage: parseFloat(((el.amount / capital) * 100).toFixed(2))
        }));
    } catch (e) {
        return e.message;
    }
}



module.exports = { projectInvestors }