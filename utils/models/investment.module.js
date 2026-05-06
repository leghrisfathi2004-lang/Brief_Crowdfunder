const mongoose = require('mongoose');


const investmentSchema = new mongoose.Schema({
    investorId: { type: mongoose.Schema.Types.ObjectId,
        ref:'user', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId,
        ref:'Project', required: true },
    amount: {type: Number, required: true}
});

const investment = mongoose.model('Investment', investmentSchema);

module.exports = investment;