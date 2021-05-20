const pool = require('../db');

const createVendor = async (req, res) => {
    try {
        const {name, location, tel_no, terms} = req.body;
        const newVendor = await pool.query('INSERT INTO vendor (name, location, tel_no, terms) VALUES ($1, $2, $3, $4)' ,[name, location, tel_no, terms]);
        res.json(newVendor.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getVendors = async (req, res) => {
    try {
        const allVendors = await pool.query('SELECT * FROM vendor');
        res.json(allVendors.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const fetchedVendor = await pool.query('SELECT * FROM vendor WHERE vendor_id = $1', [id]);
        res.json(fetchedVendor.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const updateVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, terms, tel_no} = req.body;

        const updatedVendor = await pool.query('UPDATE vendor SET name = $1, location = $2, terms = $3, tel_no = $4 WHERE vendor_id = $5', [name, location, terms, tel_no, id]);
        res.json("vendor updated");

    } catch (err) {
        console.error(err.message);
    }
}

const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await pool.query('DELETE FROM vendor WHERE vendor_id = $1', [id]);
        res.json("vendor deleted");
    } catch (err) {
        console.error(err.message);
    }
}



module.exports = {
    getVendor,
    getVendors,
    createVendor,
    deleteVendor,
    updateVendor,
}