const mysql = require('mysql');
const moment = require('moment')

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.homePage = (req, res) => {
    res.render('homePage'); // Render the "home" template without querying the database
};

exports.dologinStudent = (req, res) => {
    const { email, password, role } = req.body;
    const selectedRole = Array.isArray(role) ? role[1] : role;
  
    // Validate email and password if necessary
  
    // Check if role selected is admin
    if (selectedRole === 'student') {
        // Query your database to validate admin credentials
        connection.query('SELECT * FROM login WHERE Email = ? AND stu_password = ?', [email, password], (err, rows) => {
            if (!err && rows.length > 0) {
                // If admin credentials are valid, redirect to admin panel
                res.redirect('homePage');
            } else {
                // If admin credentials are invalid, render login page with error message
                res.render('login', { alert: 'Username and password not matched!' });
            }
        });
    } else {
        // If role selected is not admin, render login page with error message
        res.render('login', { alert: 'You are not authorized to access the admin panel.' });
    }
  };
  
  