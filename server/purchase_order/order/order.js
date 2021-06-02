const pool = require('../../db');

const getPurchaseOrderOrders = async(req, res) => {
    try {
        const fetchedOrders = await pool.query('SELECT * FROM purchase_order_order');
        res.json(fetchedOrders.rows);
        
    } catch (error) {
        console.error(error.message);
    }
}

const getPurchaseOrderOrder = async(req, res) => {
    const { id } = req.params

    try {
        const fetchedOrder = await pool.query('SELECT * FROM purchase_order_order WHERE purchase_order_id = $1', [id]);
    } catch (error) {
        console.error(error.message);
    }
}

const createPurchaseOrderOrder = async(req, res) => {
    const {purchase_order_id, item_type, product, quantity, quantity_received, unit, category, unit_price, total_price} = req.body;
    try {
        const createdOrder = await pool.query('INSERT INTO purchase_order_order (purchase_order_id, item_type, product, quantity, quantity_received, unit, category, unit_price, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [purchase_order_id, item_type, product, quantity, quantity_received, unit, category, unit_price, total_price]);

        res.json(createdOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getPurchaseOrderOrders,
    getPurchaseOrderOrder,
    createPurchaseOrderOrder
}