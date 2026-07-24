const express = require('express');
const { pool } = require('../index');
const router = express.Router();

// Add product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const result = await pool.query(
      'INSERT INTO products (name, description, price, category, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category, stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Update product
router.patch('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category = $4, stock = $5 WHERE id = $6 RETURNING *',
      [name, description, price, category, stock, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get all orders (admin)
router.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalOrders = await pool.query('SELECT COUNT(*) FROM orders');
    const totalRevenue = await pool.query('SELECT SUM(total_price) FROM orders WHERE status = $1', ['completed']);
    const totalProducts = await pool.query('SELECT COUNT(*) FROM products');

    res.json({
      totalOrders: totalOrders.rows[0].count,
      totalRevenue: totalRevenue.rows[0].sum || 0,
      totalProducts: totalProducts.rows[0].count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;