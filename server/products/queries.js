const pool = require('../db');


const createProduct = async (req, res) => {
    try {

        const { name, type, description } = req.body;

        const newProduct = await pool.query('INSERT INTO product (name, type, description) VALUES ($1, $2, $3)', [name, type, description])
        res.json(newProduct.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
}

const getProducts = async (req, res) => {
    try {
        const allProducts = await pool.query('SELECT * FROM product');
        res.json(allProducts.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM product WHERE product_id = $1', [id]);

        res.json(product.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, description } = req.body;
        const updateProduct = await pool.query('UPDATE product SET name = $1, type = $2, description = $3 WHERE product_id = $4', [name, type, description, id]);
        res.json("Product updated");
    } catch (err) {
        console.error(err.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await pool.query('DELETE FROM product WHERE product_id = $1', [id]);
        res.json("Product deleted");

    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    getProduct,
    deleteProduct,
}