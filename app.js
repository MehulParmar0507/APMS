const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Routes based on different roles
const adminRoutes = require('./server/routes/user');
const studentRoutes = require('./server/routes/Student');
const guideRoutes = require('./server/routes/Guide');

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('.hbs', exphbs.engine( {extname: '.hbs',defaultLayout:"main" }));
app.set('view engine', 'hbs');

// Connection Pool
// You don't need the connection here as we have it in userController
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
 

//const routes = require('./server/routes/user');
app.use('/', adminRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));