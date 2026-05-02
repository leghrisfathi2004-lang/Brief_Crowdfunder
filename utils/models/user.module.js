const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:['owner', 'investor', 'admin'], required: true},
    balance: {type: Number, default:0 }
});

const user = mongoose.model('user', userSchema);

module.exports = user;