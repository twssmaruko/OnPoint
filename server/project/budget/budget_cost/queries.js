const pool = require('../../../db');
const {getBudgetSubcategories} = require('../budget_subcategory/queries');

const getBudgetCosts = async (req, res) => {
    try {
        const fetchedBudgetCosts = await pool.query('SELECT * FROM budget_cost')
        res.json(fetchedBudgetCosts.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getBudgetCost = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === 'subcategories') {
            getBudgetSubcategories(req, res);
            console.log('/costs/subcategories');
        } else if(id === 'budget_cost_id') {
            const fetchedBudgetCostId = await pool.query('SELECT MAX(budget_cost_id) FROM budget_cost');
            res.json(fetchedBudgetCostId.rows);
        }else {
            const fetchedBudget = await pool.query('SELECT * FROM budget_cost WHERE project_budget_id = $1', [id])
            res.json(fetchedBudget.rows);
        }
    } catch (err) {
        console.error(err.message);
    }
}

const createBudgetCost = async (req, res) => {
    try {

        const { project_budget_id, budget_name, total_cost, item_code, amount_spent } = req.body;
        const createdBudget = await pool.query('INSERT INTO budget_cost (project_budget_id, budget_name, total_cost, item_code, amount_spent) VALUES ($1, $2, $3, $4, $5)',
            [project_budget_id, budget_name, total_cost, item_code, amount_spent]);
        res.json(createdBudget.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const deleteBudgetCost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBudget = await pool.query('DELETE FROM project_budget WHERE project_budget_id = $1', [id]);
        res.json('budget cost deleted');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getBudgetCosts,
    getBudgetCost,
    createBudgetCost,
    deleteBudgetCost
}