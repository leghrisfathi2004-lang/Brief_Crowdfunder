require('dotenv').config();
const express = require("express");
const { dbconnexion } = require("../utils/db.config");
const handleErr = require('../middleware/errorHandler');
const app = express();


//routes
const userRT = require('../routes/user.route');
const ownerRT = require('../routes/owner.route');
const investorRT = require('../routes/investor.route');
const adminRT = require('../routes/admin.route');

app.use(express.json());

app.use('/api/user/', userRT);
app.use('/api/admin/', adminRT);
app.use('/api/owner/', ownerRT);
app.use('/api/investor/', investorRT);

app.use(handleErr);

dbconnexion();
const port = process.env.PORT || process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});