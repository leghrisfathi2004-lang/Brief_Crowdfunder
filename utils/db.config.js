const mongoose = require('mongoose');

const dbconnexion = async () => {
    try{
        await mongoose.connect(process.env.mongoURL);
        console.log('DB connection success!');
    } catch(e) {
        console.error('DB connection failed: ', e.message );
    }
}

module.exports = { dbconnexion }