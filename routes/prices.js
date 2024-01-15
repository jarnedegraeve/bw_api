const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'rs_api',
    password: 'db',
    database: 'runescape_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create Price
router.post('/', (req, res) => {
    const { item_id, price } = req.body;

    // Validate input
    if (!item_id || isNaN(item_id) || !price || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid item_id or price' });
    }

    // Insert a new price record
    db.query('INSERT INTO prices (item_id, price) VALUES (?, ?)', [item_id, price], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, item_id, price });
    });
});

// Update Price
router.put('/:id', (req, res) => {
    const priceId = req.params.id;
    const { price } = req.body;

    // Validate input
    if (!price || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid price' });
    }

    // Update the price record
    db.query('UPDATE prices SET price = ? WHERE id = ?', [price, priceId], (err) => {
        if (err) throw err;
        res.json({ id: priceId, price });
    });
});

// Delete Price
router.delete('/:id', (req, res) => {
    const priceId = req.params.id;

    // Delete the price record
    db.query('DELETE FROM prices WHERE id = ?', [priceId], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

module.exports = router;
