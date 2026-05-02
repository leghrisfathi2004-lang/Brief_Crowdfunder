const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true},
    description: { type: String, required: true}, 
    capital: {type: Number, required: true},
    amount: {type: Number, required: true},
    status: { type: String, enum: ['open', 'close'], default: 'open'},
    percentMax: {type: Number, default: 50},
    initialInvest: { type: Number, default: 0 },
    ownerId: { type: mongoose.Schema.ObjectId, ref:'user', required: true}
});

const project = mongoose.model('Project', userSchema);

module.exports = project;