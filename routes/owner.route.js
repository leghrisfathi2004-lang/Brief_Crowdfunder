const express = require('express');
const ownerRT = express.Router();

//------ middleware ------
const { addProjectShema, updateProjectSchema } = require('../middleware/validation/schema');
const validate = require('../middleware/validation/validation');
const ownerGuard = require('../middleware/guard/owner.guard');
const ownerAuth = require('../middleware/authentication/owner.auth');

//------ controller ------
const { addProject, updateProject, closeProject, deleteProject, getProjects, getProjectInvestors } = require('../controllers/owner.controller');

ownerRT.post('/project', ownerAuth, validate(addProjectShema), addProject);

ownerRT.post('/project/close/:id', ownerAuth, ownerGuard, closeProject);

ownerRT.get('/project', ownerAuth, getProjects);

ownerRT.get('/project/:id/invistors', ownerAuth, ownerGuard, getProjectInvestors);

ownerRT.patch('/project/:id', ownerAuth, ownerGuard, validate(updateProjectSchema), updateProject);

ownerRT.delete('/project/:id', ownerAuth, ownerGuard, deleteProject);

module.exports = ownerRT;