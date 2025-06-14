const express = require('express');
const cors = require('cors');
const postgresPool = require('pg').Pool;
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; // Default port is 3000 but it can be overridden by an environment variable
const { body, param, validationResult } = require('express-validator');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));


// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Student validation rules
const studentValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    
  body('major')
    .trim()
    .notEmpty().withMessage('Major is required')
    .isLength({ min: 3 }).withMessage('Major must be longer than 2 characters'),
    
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail()
];

// ID validation rule
const idValidationRule = [
  param('studentID')
    .isInt({ min: 1 }).withMessage('Student ID must be a positive integer')
    .toInt()
];





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

// Grab ALL the Data Now Code 200
app.get("/students", (req,res) =>{
    const sql = "SELECT * FROM student";
    pool.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result.rows)
    })
})

//Grabs Certain Data - if Student ID Matches Code 200
app.get("/students/:studentID", (req,res) =>{
    const StuID = Number(req.params.studentID)
    
    const sql = "SELECT * FROM student WHERE studentid = $1";
    pool.query(sql, [StuID], (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result.rows[0])
    })
})

// Posts Certain Data CODE 201
app.post("/students", 
    validate,
    studentValidationRules,
    (req,res) =>{
    const {name,major,email} = req.body;
    const sql = "INSERT INTO student (name,major,email) VALUES ($1, $2, $3) RETURNING *";
    pool.query(sql, [name,major,email], (err, result) => {
    if (err) return res.json(err);
    return res.status(201).json(result.rows)
    })
})

// Patch Certain Data Update
app.patch("/students/:studentID", 
    idValidationRule,
    studentValidationRules,
    validate,
    (req,res) =>{
    const StuID = Number(req.params.studentID)
    const {name,major,email} = req.body;
    const sql = "UPDATE student SET name = $1, major = $2, email = $3 WHERE studentid = $4 ";
    pool.query(sql, [name,major,email, StuID], (err, result) => {
    if (err) return res.json(err);
    return res.status(200).send(`Student ${StuID} has been Updated`);
    })
})

// Delete
app.delete("/students/:studentID", (req,res) =>{
    const StuID = Number(req.params.studentID)
    const sql = "DELETE FROM student WHERE studentid = $1";
    pool.query(sql, [StuID], (err, result) => {
    if (err) return res.json(err);
    return res.status(200).send(`Student ${StuID} has been Removed`);
    })
})