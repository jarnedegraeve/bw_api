const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const itemsRoutes = require('./routes/items');
const pricesRoutes = require('./routes/prices');
const app = express();
const port = 3000;

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

app.use(bodyParser.json());

// Use Item Routes
app.use('/items', itemsRoutes);

// Use Price Routes
app.use('/prices', pricesRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});