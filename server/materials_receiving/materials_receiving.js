const pool = require('../db');


const createMaterialsReceiving = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
    }
}

const getAllMaterialsReceiving = async (req, res) => {
    try {
        const allMaterialsReceiving = await pool.query('SELECT * FROM materials_receiving');
        res.json(allMaterialsReceiving.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getMaterialsReceiving = async(req, res) => {
    try {
        const {id} = req.params;
        if(id === 'orders') {
            const getMaterialsReceivingOrders = await pool.query("SELECT * FROM materials_receiving_order");
            res.json(getMaterialsReceivingOrders)
        } else {
            const getMaterialsReceiving = await pool.query("SELECT * FROM materials_receiving WHERE materials_receiving_id = $1", [id]);
            res.json(getMaterialsReceiving.rows);
        }
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    getAllMaterialsReceiving,
    getMaterialsReceiving
}