const pool = require('../db');

const getPurchaseOrders = async (req, res) => {
    try {
        const fetchedPurchaseOrders = await pool.query('SELECT * FROM purchase_order');
        res.json(fetchedPurchaseOrders.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getPurchaseOrder = async (req, res) => {
    try {
        const {id} = req.params
        const fetchedPurchaseOrder = await pool.query('SELECT * FROM purchase_order WHERE purchase_order_id = $1', [id]);
        res.json(fetchedPurchaseOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const createPurchaseOrder = async (req, res) => {
    try {

        const { purchase_request_id, vendor_id, project_id, notes, purchase_order_number, date_created, requested_by, status, total_price } = req.body;
        const createdPurchaseOrder = await pool.query('INSERT INTO purchase_order (purchase_request_id, vendor_id, project_id, notes, purchase_order_number, date_created, requested_by, status, total_price) VALUES ($1, $2, $3, $4, $5, now(), $6, $7, $8)', [purchase_request_id, vendor_id, project_id, notes, purchase_order_number, requested_by, status, total_price]);

        res.json(createdPurchaseOrder.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const deletePurchaseOrder = async (req, res) => {
    try {
        const {id} = req.params
    } catch (err) {
        console.error(err.message);
    }
}

// const deletePurchaseOrder = async (req, res) => {
//     try {
//         const { id } = req.params,
//         const deletedPurchaseOrder = await pool.query('DELETE FROM purchase_order WHERE purchase_order_id = $1', [id]);
//         res.json('purchase order deleted');
//     } catch (err) {
//         console.error(err.message);
//     }
// }

module.exports = {
    getPurchaseOrders,
    getPurchaseOrder,
    createPurchaseOrder,
}