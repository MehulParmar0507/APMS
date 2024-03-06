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
exports.view = (req, res) => {
  
  connection.query('SELECT * FROM Project_Details', (err, rows) => {
    if (!err) {
      // Format dates before passing to the template
      rows.forEach(row => {
        row.Project_Date = moment(row.Project_Date).format('DD MMM YYYY');
      });
      
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from Project Details table: \n', rows);
  });
}


// View result
exports.views = (req, res) => {
  
  connection.query('SELECT DISTINCT id  FROM result ORDER BY id LIMIT 5', (err, rows) => {
    if (!err) {
      // Format dates before passing to the template
      rows.forEach(row => {
        row.Project_Date = moment(row.Project_Date).format('DD MMM YYYY');
      });
      
      let removedUser = req.query.removed;
      res.render('result', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}

exports.viewstudent = (req, res) => {
  
  connection.query('SELECT * FROM Student_Details where Student_id = ?',[req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-student', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}

exports.editproject = (req, res) => {
  connection.query('SELECT * FROM Project_Details where Project_id = ?',[req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  
  connection.query('SELECT * FROM student_details WHERE id LIKE ? OR name LIKE ? OR gender LIKE ? OR department LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%',  '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if(rows ==0 ){
      res.render('home', { alert: 'student_details Not found.' });

    }
   else  if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
  });
}

exports.finds = (req, res) => {
  let searchTerm = req.body.sr;
  
  connection.query('SELECT DISTINCT id FROM result WHERE id LIKE ?', ['%' + searchTerm + '%'  ], (err, rows) => {
    if(rows ==0 ){
      res.render('result', { alert: 'Result Not found.' });
    }
    else if (!err) {
      res.render('result', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.dologin = (req, res) => {
  const { email, password, role } = req.body;
  const selectedRole = Array.isArray(role) ? role[1] : role;

  // Validate email and password if necessary

  // Check if role selected is admin
  if (selectedRole === 'admin') {
      // Query your database to validate admin credentials
      connection.query('SELECT * FROM login WHERE Email = ? AND stu_password = ?', [email, password], (err, rows) => {
          if (!err && rows.length > 0) {
              // If admin credentials are valid, redirect to admin panel
              res.redirect('/');
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



// Add new user
exports.create = (req, res) => {
  const { project_name, Project_Date, Project_Link, Project_Guide } = req.body;

  connection.query('INSERT INTO Project_Details SET project_name = ?, Project_Date = ?, Project_Link = ?, Project_Guide = ?', [project_name, Project_Date, Project_Link, Project_Guide], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'Project Details added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
  });
}

exports.editprojects = (req, res) => {
  const { project_id, project_name, Project_Date, Project_Link, Project_Guide } = req.body;

  connection.query('update Project_Details SET project_name = ?, Project_Date = ?, Project_Link = ?, Project_Guide = ? WHERE project_id = ?', [project_name, Project_Date, Project_Link, Project_Guide, project_id], (err, rows) => {
    if (!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
  });
}




exports.forms = (req, res) => {
  res.render('add-result');
}

// Add new result
exports.creates = (req, res) => {
  const { id, semester, cgpa } = req.body;
  let searchTerm = req.body.search;


  connection.query('INSERT INTO result SET id = ?, semester = ?, cgpa = ?', [id, semester, cgpa], (err, rows) => {
    if (!err) {
      res.render('add-result', { alert: 'Result added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}




// Edit user
exports.edit = (req, res) => {

  connection.query('SELECT * FROM student_details WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
  });
}

exports.deletemember = (req, res) => {
  var id = req.params.id;
  var prid = req.params.prid;
  connection.query('delete from Team_Details WHERE id = ?', [id], (err, rows) => {
    if (!err) {
      res.redirect('/viewproject/'+prid);
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
  });
}

exports.deleteproject = (req, res) => {
  var id = req.params.id;
  connection.query('delete from Project_Details WHERE Project_id = ?', [id], (err, rows) => {
    if (!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
  });
}

// Edit user
exports.addmembers = (req, res) => {
  const { studentName, department } = req.body;
  const projectId = req.params.id; // Assuming project ID is available in the URL parameters

  // Check if all required fields are present
  if (!projectId || !studentName || !department) {
    return res.status(400).send('Bad Request: Missing required fields');
  }

  // Insert the student's name and department into the database
  connection.query(
    'INSERT INTO Team_Details (project_id, student_name, department) VALUES (?, ?, ?)',
    [projectId, studentName, department],
    (err, result) => {
      if (err) {
        console.error('Error inserting student details:', err);
        return res.status(500).send('Internal Server Error');
      }
      
      // Redirect or render a success page if needed
      res.redirect(`/viewproject/${projectId}`);
    }
  );
};



exports.addmember = (req, res) => {
  connection.query('SELECT * FROM Team_Details WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      connection.query('SELECT * FROM Student_Details', (err, stdde) => {
        const id = req.params.id;
        res.render('add-member', { id , stdde });
      })
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
  });
}

// login
exports.login = (req, res) => {
  res.render('login');
}

// View Users
exports.viewall = (req, res) => {
  connection.query('SELECT * FROM Project_Details WHERE Project_id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      // Format dates before passing to the template
      rows.forEach(row => {
        row.Project_Date = moment(row.Project_Date).format('DD MMM YYYY');
      });

      const id = { id : rows[0].Project_id };
      connection.query('SELECT * FROM Team_Details WHERE project_id = ?', [req.params.id], (err, tdrow) => {
        if (!err) {
          // Format dates in the tdrow data as well, if necessary
          tdrow.forEach(row => {
            // Assuming there's a Project_Date field in Team_Details
            row.Project_Date = moment(row.Project_Date).format('DD MMM YYYY');
          });

          res.render('view-user', { rows , id, tdrow });
        } else {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
      });
    } else {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });
}


// View Results by id
exports.viewalls = (req, res) => {
  // connection.query('SELECT * FROM student_details INNER JOIN result ON student_details.id = result.id WHERE student_details.id = ?', [req.params.id], (err, rows) => {
     connection.query('SELECT * FROM student_details NATURAL JOIN result WHERE id = ? ORDER BY semester', [req.params.id], (err, rows) => {

    if (!err) {
      res.render('view-result', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}