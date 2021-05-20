const pool = require('../db');

const getPurchaseRequests = async (req, res) => {
    try {
        const allPurchaseRequests = await pool.query('SELECT * FROM purchase_request');
        res.json(allPurchaseRequests.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getPurchaseRequest = async (req, res) => {
    try {

        const { id } = req.params;
        if (id === 'last_id') {
            const fetchedID = await pool.query('SELECT MAX(purchase_request_id) FROM purchase_request');
            res.json(fetchedID.rows);
        } else if (id === 'orders') {
            const allPurchaseRequestOrders = await pool.query('SELECT * FROM purchase_request_order');
            res.json(allPurchaseRequestOrders.rows);
        }
        else {
            const fetchedPurchaseRequest = await pool.query('SELECT * FROM purchase_request WHERE purchase_request_id = $1', [id]);
            res.json(fetchedPurchaseRequest.rows[0]);
        }

    } catch (err) {
        console.error(err.message);
    }
}

const createPurchaseRequest = async (req, res) => {
    try {
        const { purchase_request_number, is_approved, requested_by, status } = req.body;
        const newPurchaseRequest = await pool.query('INSERT INTO purchase_request (purchase_request_number, is_approved, requested_by, status, date_created) VALUES($1, $2, $3, $4, now())', [purchase_request_number, is_approved, requested_by, status]);
        res.json(newPurchaseRequest.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const getLastPurchaseRequestID = async (req, res) => {
    try {
        const lastPurchaseRequestID = await pool.query('SELECT MAX(purchase_request_id) FROM purchase_request');
        res.json(lastPurchaseRequestID.rows);

    } catch (err) {
        console.error(err.message);
    }
}

const deletePurchaseRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePurchaseRequestOrders = await pool.query('DELETE FROM purchase_request_order WHERE purchase_request_id = $1', [id]);
        const deletedPurchaseRequest = await pool.query('DELETE FROM purchase_request WHERE purchase_request_id = $1', [id]);
        res.json('purchase request deleted');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getPurchaseRequests,
    getPurchaseRequest,
    getLastPurchaseRequestID,
    deletePurchaseRequest,
    createPurchaseRequest,
}