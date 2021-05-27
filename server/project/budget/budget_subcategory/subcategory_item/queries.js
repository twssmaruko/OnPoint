const pool = require('../../../../db');

const getSubcategoryItems = async(req, res) => {
    try {
        const fetchedSubcategoryItems = await pool.query('SELECT * FROM subcategory_item');
        res.json(fetchedSubcategoryItems.rows);
        
    } catch (err) {
        console.error(err.message);
    }
}

const getSubcategoryItem = async (req, res) => {
    try {
        const {id} = req.params
        const fetchedSubcategoryItem = await pool.query('SELECT * FROM subcategory_item WHERE budget_subcategory_id = $1', [id]);
        res.json(fetchedSubcategoryItem.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const createSubCategoryItem = async (req, res) => {
    try {
        const {budget_subcategory_id, subcategory_item_no, subcategory_item_name, subcategory_item_cost, amount_spent, subcategory_category, project_id} = req.body;
        const createdSubcategoryItem = await pool.query('INSERT INTO subcategory_item (project_id, budget_subcategory_id, subcategory_item_no, subcategory_item_name, subcategory_item_cost, subcategory_category, amount_spent) VALUES ($1, $2, $3, $4, $5, $6, $7)', [project_id, budget_subcategory_id, subcategory_item_no, subcategory_item_name, subcategory_item_cost,subcategory_category,  amount_spent, ]);

        res.json(createdSubcategoryItem.rows);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports =  {
    getSubcategoryItems,
    getSubcategoryItem,
    createSubCategoryItem
}