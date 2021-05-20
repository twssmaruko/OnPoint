const pool = require('../../db');
const { getBudgetCosts } = require('./budget_cost/queries');

const getBudgets = async (req, res) => {
    try {
        const fetchedBudgets = await pool.query('SELECT * FROM project_budget')
        res.json(fetchedBudgets.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getBudget = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === 'costs') {
            getBudgetCosts(req, res);
        } else if(id === 'budget_id') {
            const fetchedBudgetId = await pool.query('SELECT MAX(project_budget_id) FROM project_budget');
            res.json(fetchedBudgetId.rows[0]);
        }else {
            const fetchedBudget = await pool.query('SELECT * FROM project_budget WHERE project_id = $1', [id])
            res.json(fetchedBudget.rows);
        }
    } catch (err) {
        console.error(err.message);
    }
}

const createBudget = async (req, res) => {
    try {

        const { project_id, contract_price, budget_price, profit, profit_margin } = req.body;
        const createdBudget = await pool.query('INSERT INTO project_budget (project_id, contract_price, budget_price, profit, profit_margin) VALUES ($1, $2, $3, $4, $5)',
            [project_id, contract_price, budget_price, profit, profit_margin]);
        res.json(createdBudget.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBudget = await pool.query('DELETE FROM project_budget WHERE project_id = $1', [id]);
        res.json('budget deleted');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getBudgets,
    getBudget,
    createBudget,
    deleteBudget
}