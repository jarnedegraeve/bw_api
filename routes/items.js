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

// Create Item
router.post('/', (req, res) => {
    const { name } = req.body;

    // Validate input
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Insert a new item record
    db.query('INSERT INTO items (name) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, name });
    });
});

// Update Item
router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const { name } = req.body;

    // Validate input
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Update the item record
    db.query('UPDATE items SET name = ? WHERE id = ?', [name, itemId], (err) => {
        if (err) throw err;
        res.json({ id: itemId, name });
    });
});

// Delete Item
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;

    // Delete the item record
    db.query('DELETE FROM items WHERE id = ?', [itemId], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

module.exports = router;
