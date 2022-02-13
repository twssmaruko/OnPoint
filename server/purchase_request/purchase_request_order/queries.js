const pool = require('../../db');

const getPurchaseRequestOrders = async (req, res) => {
    try {
        const allPurchaseRequestOrders = await pool.query('SELECT * FROM purchase_request_order');
        res.json(allPurchaseRequestOrders.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getPurchaseRequestOrderQuantityLeft = async (req, res) => {
    const {id} = req.params;
    try {
        const fetchedPurchaseRequestOrder = await pool.query('SELECT quantity_left FROM purchase_request_order WHERE purchase_request_order_id = $1', [id]);

        res.json(fetchedPurchaseRequestOrder.rows[0]);

    } catch (error) {
        
    }
}

const getAllPurchaseRequestOrder = async(req,res) => {
    try {
        const {id} = req.params;
        const allPurchaseRequestOrders = await pool.query('SELECT * FROM purchase_request_order WHERE purchase_request_id = $1', [id]);
        res.json(allPurchaseRequestOrders.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const updatePurchaseRequestOrderQuantityLeft = async (req, res) => {
    const { id } = req.params;
    const {quantity_left} = req.body;
    try {
        const updatedQuantityLeft = await pool.query('UPDATE purchase_request_order SET quantity_left = $1 WHERE purchase_request_order_id = $2', [quantity_left, id])
        res.json('purchase_request_updated');
    } catch (err) {
        console.error(err.message);
    }
}


const createPurchaseRequestOrder = async (req, res) => {
    try {
        
        const {purchase_request_id, item_type, product, quantity, quantity_left, unit, unit_price} = req.body;
        const newPurchaseRequestOrder = await pool.query('INSERT INTO purchase_request_order (purchase_request_id, item_type, product, quantity, quantity_left, unit, unit_price) VALUES($1, $2, $3, $4, $5, $6, $7)', 
        [purchase_request_id, item_type, product, quantity, quantity_left, unit, unit_price]);
        res.json(newPurchaseRequestOrder.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const getPurchaseRequestOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const fetchedPurchaseRequestOrder = await pool.query('SELECT * FROM purchase_request_order WHERE purchase_request_order_id = $1', [id]);
        res.json(fetchedPurchaseRequestOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getPurchaseRequestOrders,
    getAllPurchaseRequestOrder,
    getPurchaseRequestOrderQuantityLeft,
    getPurchaseRequestOrder,
    updatePurchaseRequestOrderQuantityLeft,
    createPurchaseRequestOrder
}