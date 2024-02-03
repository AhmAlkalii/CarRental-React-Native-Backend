const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;
const dbPath = './availablecars.db';

app.use(cors());

// Create or connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(`Error connecting to the database: ${err.message}`);
    } else {
      console.log(`Connected to the database: ${dbPath}`);
    }
});

//existing endpoint for fetching data
app.get('/api/data', (req, res) => {
    // Fetch data from the database and send it as a response
    const selectQuery = 'SELECT * FROM engine_data';
    db.all(selectQuery, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ type: 'Engine', data: rows });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
