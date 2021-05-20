const pool = require('../../../db');
const subcategoryItemDB = require('./subcategory_item/queries');

const getBudgetSubcategories = async (req, res) => {
    try {
        const fetchedBudgetSubcategories = await pool.query('SELECT * FROM budget_subcategory');
        res.json(fetchedBudgetSubcategories.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getBudgetSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === 'items') {
            subcategoryItemDB.getSubcategoryItems(req, res);
        } else if(id === 'budget_subcategory_id') {
            const fetchedSubcategoryId = await pool.query('SELECT MAX(budget_subcategory_id) FROM budget_subcategory');
            res.json(fetchedSubcategoryId.rows);
        }else {
            const fetchedBudgetSubcategory = await pool.query('SELECT * FROM budget_subcategory WHERE budget_cost_id = $1', [id]);
            res.json(fetchedBudgetSubcategory.rows);
        }
    } catch (err) {
        console.error(err.message);
    }
}

const createBudgetSubcategory = async (req, res) => {
    try {
        const {budget_cost_id, budget_subcategory_name, total_cost, item_code, amount_spent} = req.body;
        const createdBudgetSubcategory = await pool.query('INSERT INTO budget_subcategory (budget_cost_id, budget_subcategory_name, total_cost, item_code, amount_spent) VALUES ($1, $2, $3, $4, $5)', [budget_cost_id, budget_subcategory_name, total_cost, item_code, amount_spent]);

        res.json(createdBudgetSubcategory.rows);
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    getBudgetSubcategories,
    getBudgetSubcategory,
    createBudgetSubcategory
}