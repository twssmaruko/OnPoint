const pool = require('../db');

const getPurchaseRequests = async (req, res) => {
    try {
        const allPurchaseRequests = await pool.query('SELECT * FROM purchase_request');
        res.json(allPurchaseRequests.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getPurchaseRequestNumber = async (req, res) => {
    const { id } = req.params;

    try {
        const fetchedNumber = await pool.query('SELECT purchase_request_number FROM purchase_request WHERE purchase_request_id = $1', [id])
        res.json(fetchedNumber.rows);
    } catch (error) {
        
    }
}

const updatePurchaseRequestStatus = async (req, res) => {
    const { id } = req.params;
    const {status} = req.body;

    try {

        const updatedStatus = await pool.query('UPDATE purchase_request SET status = $1 WHERE purchase_request_id = $2', [status, id])
        res.json('status updated');
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
        const { purchase_request_number, is_approved, requested_by, status, pr_type } = req.body;
        const newPurchaseRequest = await pool.query('INSERT INTO purchase_request (purchase_request_number, is_approved, requested_by, status, date_created, pr_type) VALUES($1, $2, $3, $4, now(), $5)', [purchase_request_number, is_approved, requested_by, status, pr_type]);
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
    getPurchaseRequestNumber,
    updatePurchaseRequestStatus,
    getLastPurchaseRequestID,
    deletePurchaseRequest,
    createPurchaseRequest,
}