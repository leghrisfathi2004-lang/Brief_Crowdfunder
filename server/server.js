const express = require("express");
const { dbconnexion } = require("../utils/db.config");
//add routes here

const app = express();
//spreat routes here

dbconnexion();
const port = process.env.port;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});