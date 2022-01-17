const pool = require('../db');

const createEquipment = async(req, res) => {
    try {
        const {equipment_name, equipment_category} = req.body;
        const newEquipment = await pool.query('INSERT INTO equipment (equipment_name, equipment_category) VALUES ($1, $2)', [equipment_name, equipment_category]);
        res.json(newEquipment.rows);
        
    } catch (err) {
        console.error(err.message);
    }
}

const getEquipment = async(req, res) => {
    try {
        const allEquipment = await pool.query('SELECT * FROM equipment');
        res.json(allEquipment.rows);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    createEquipment,
    getEquipment
}