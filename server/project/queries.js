const pool = require('../db');
const budgetDB = require('./budget/queries');

const getProjects = async (req, res) => {
    try {
        
        const fetchedProjects = await pool.query('SELECT * FROM project');
        res.json(fetchedProjects.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const getProject = async (req, res) => {
    try {
        const {id} = req.params;
        if(id === 'budgets') {
            budgetDB.getBudgets(req, res);
        } else if (id ==='project_id') {
            const fetchedProjectId = await pool.query('SELECT MAX(project_id) FROM project');
            res.json(fetchedProjectId.rows[0]);
        }else {
            const fetchedProject = await pool.query('SELECT * FROM project WHERE project_id = $1', [id]);
            
            res.json(fetchedProject.rows);
        }
    } catch (err) {
        console.error
    }
}

const createProject = async (req, res) => {
    try {
        const {project_location, project_status, client_name, project_code, project_name} = req.body;
        const createdProject = await pool.query('INSERT INTO project (project_location, project_status, client_name, project_code, project_name) VALUES ($1, $2, $3, $4, $5)',
        [project_location, project_status, client_name, project_code, project_name]);
        res.json(createdProject.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedSubcategoryItems = await pool.query('DELETE FROM subcategory_item WHERE project_id = $1', [id]);
        const deletedSubcategories = await pool.query('DELETE FROM budget_subcategory WHERE project_id = $1', [id]);
        const deletedBudgetCosts = await pool.query('DELETE FROM budget_cost WHERE project_id = $1', [id]);
        const deletedBudget = await pool.query('DELETE FROM project_budget WHERE id = $1', [id]);
        const deletedProject = await pool.query('DELETE FROM project WHERE project_id = $1', [id]);
        res.json('project deleted');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    deleteProject
}