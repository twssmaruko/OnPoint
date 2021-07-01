const pool = require('../../db');

const getMaterialsReceivingOrder = async(req,res) => {
    try {

        const {id} = req.params;
        const fetchedOrders = await pool.query("SELECT * FROM materials_receiving_order WHERE materials_receiving_id = $1", [id]);
        res.json(fetchedOrders.rows);
        
    } catch (err) {
        console.error(err.message);
    }
}
module.exports = {
    getMaterialsReceivingOrder
}