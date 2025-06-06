const express = require('express');
const cors = require('cors');
const postgresPool = require('pg').Pool;
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Default port is 3000 but it can be overridden by an environment variable


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server ${port} is running successfully`);
    }
}
);

// PostgreSQL connection pool
const pool = new postgresPool({
    user: 'postgres',
    password: '21363001',
    database: 'student_master',
    host: 'localhost',
    port: 5432,
    max: 10 // Maximum number of active users
    // idleTimeoutMillis: 30000, // Close idle clients who havent done anything for 30 seconds
    // connectionTimeoutMillis: 2000 // Baiscally mean that if you havent connected in 2 seconds it stops trying so that the app stops trying to run
});

pool.connect((err, client) => {
    if (err) {
        console.error('DATABASE UNSUCCESSFUL ERROR THROWN:', err);
    } else {
        console.log('DataBase has been connected');
    }
});


