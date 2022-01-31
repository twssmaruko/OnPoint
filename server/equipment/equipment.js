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

const fetchEquipment = async(req, res) => {
    try {
        const allEquipment = await pool.query('SELECT * FROM equipment');
        res.json(allEquipment.rows);
    } catch (err) {
        console.log(err.message);
    }
}

const updateEquipment = async(req, res) => {
    try {
        const {equipment_name, equipment_category, equipment_id} = req.body;
        const editedEquipment = await pool.query('UPDATE equipment SET equipment_name = $1, equipment_category = $2 WHERE equipment_id = $3', [equipment_name, equipment_category, equipment_id]);
        res.json("Equipment updated");
    } catch (err) {
        console.log(err.message);
    }
}

const getEquipment = async(req, res) => {
    try {
        const {id} = req.params;
        const fetchedEquipment = await pool.query('SELECT * FROM equipment WHERE equipment_id = $1', [id]);
        res.json(fetchedEquipment.rows[0])
    } catch (err) {
        console.error(err.message);
    }
}

const deleteEquipment = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteEquipment = await pool.query('DELETE FROM equipment WHERE equipment_id = $1', [id]);
        res.json('Equipment Deleted');
    } catch (error) {
        
    }
}

module.exports = {
    createEquipment,
    fetchEquipment,
    updateEquipment,
    getEquipment,
    deleteEquipment
}