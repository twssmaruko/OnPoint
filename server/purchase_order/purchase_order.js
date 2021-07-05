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
        if (id === 'orders') {
            const fetchedOrders = await pool.query('SELECT * FROM purchase_order_order');
            res.json(fetchedOrders.rows);
        } else if(id === 'last_id'){
            const fetchedID = await pool.query('SELECT MAX(purchase_order_id) FROM purchase_order');
            res.json(fetchedID.rows);
        } else {
        const fetchedPurchaseOrder = await pool.query('SELECT * FROM purchase_order WHERE purchase_order_id = $1', [id]);
        res.json(fetchedPurchaseOrder.rows);
        }
    } catch (err) {
        console.error(err.message);
    }
}

const createPurchaseOrder = async (req, res) => {
    try {

        const { purchase_request_id, vendor_id, project_id, notes, purchase_order_number,requested_by, status, total_price,  date_created } = req.body;
        const createdPurchaseOrder = await pool.query('INSERT INTO purchase_order (purchase_request_id, vendor_id, project_id, notes, purchase_order_number, requested_by, status, total_price , date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())', [purchase_request_id, vendor_id, project_id, notes, purchase_order_number, requested_by, status, total_price]);

        res.json(createdPurchaseOrder.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const getPendingPurchaseOrder = async (req, res) => {
    try {
        const status = 'PENDING';
        const fetchedPendingPurchaseOrder = await pool.query('SELECT * FROM purchase_order WHERE status=$1', [status]);
        res.json(fetchedPendingPurchaseOrder.rows);
        
    } catch (err) {
        console.error(err.message);
    }
}

const cancelPurchaseOrder = async(req, res) => {

    const { id } = req.params
    const status = "CANCELLED";
    try {

        const cancelledPurchaseOrder = await pool.query('UPDATE purchase_order SET status=$1 WHERE purchase_order_id = $2', [status, id]);
        res.json('purchase order cancelled');
        
    } catch (err) {
     console.error(err.message);   
    }
}

const deletePurchaseOrder = async (req, res) => {
    try {
        const {id} = req.params
        const deletedOrders = await pool.query('DELETE FROM purchase_order_order WHERE purchase_order_id = $1', [id]);
        const deletedPurchaseOrder = await pool.query('DELETE FROM purchase_order WHERE purchase_order_id = $1', [id]);
        
        res.json('purchase order deleted');
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
    getPendingPurchaseOrder,
    cancelPurchaseOrder,
    deletePurchaseOrder
}