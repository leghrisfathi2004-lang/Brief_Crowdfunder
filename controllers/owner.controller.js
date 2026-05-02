const project = require('../utils/models/project.module.js');
const investment = require('../utils/models/investment.module.js');
const user = require('../utils/models/user.module.js');

const RES = require('../middleware/respond.js');
const err = require('../service/errShaper.service.js');

const { projectInvestors } = require('../service/project.service.js');
const { ownerPortfolio } = require('../service/portfolio.service.js');

// POST /api/owner/project
const addProject = async (req, res, next) => {
    try{
        const { title, description, capital, percentMax, initialInvest } = req.body;
        const ownerId = req.user.id;
        await project.create({ title, description, capital, amount: initialInvest, percentMax, initialInvest, ownerId });
        RES(res, 201, 'project added successfully');
    } catch (e) {
        next(e);
    }
}

// PATCH /api/owner/project/:id - body: title, description, capital
const updateProject = async (req, res, next) => {
    try{
        const id = req.params.id;
        const {title, description, capital} = req.body;
        const prj = await project.findById(id);
        if(prj.status === 'close')
            return next(new err(404, 'cant update closed project!'));
        const updatedProjet = await project.findByIdAndUpdate(
            id,
            { $set: { title, description, capital } },
            { new: true, runValidators: true }
        );
        RES(res, 200, 'project updated successfully!', updatedProjet);
    } catch (e) {
        next(e);
    }
}

// POST /api/owner/project/close/:id
const closeProject = async (req, res, next) => {
    try{
        const id = req.params.id;
        const updatedProjet = await project.findByIdAndUpdate(
            id,
            { $set: { status: 'close' } },
            { new: true }
        );
        RES(res, 200, 'project closed successfully!', updatedProjet);
    } catch (e) {
        next(e);
    }
}

// DELETE /api/owner/project/:id
const deleteProject = async (req, res, next) => {
    try{
        const id = req.params.id;
        await project.findByIdAndDelete(id);
        RES(res, 200, 'project deleted successfully!');
    } catch (e) {
        next(e);
    }
}

// GET /api/owner/project
const getProjects = async (req, res, next) => {
    try{
        const id = req.user.id;
        const projects = await project.find({ownerId: id});
        if(!projects || projects.length === 0)
            return next(new err(404, 'no projects found!'));
        RES(res, 200, 'projects retrieved successfully!', projects);
    } catch (e) {
        next(e);
    }
}

// GET /api/owner/project/:id/invistors
const getProjectInvestors = async (req, res, next) => {
    try{
        const id = req.params.id;
        const prjct = await project.findById(id);
        const investors = await projectInvestors(id, prjct.capital);
        if(!investors)  return next(new err(404, 'no investors found!'));
        RES(res, 200, 'success', investors);
    } catch (e) {
        next(e);
    }
}

module.exports = { addProject, updateProject, closeProject, deleteProject, getProjects, getProjectInvestors }
