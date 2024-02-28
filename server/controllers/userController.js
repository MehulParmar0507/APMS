const mysql = require('mysql');

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
  const {email, password} = req.body;
  connection.query('SELECT * FROM login WHERE Email = ? and stu_password = ?', [email, password], (err, rows) => {
    if (!err) {
      if(rows.length != 0){
        res.redirect('/');
      }else{
        res.render('login',{ alert: 'Username and Password not matched!' });
      } 
    } else {
      console.log(err);
    }
  });
}

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
  const { id, stdid, department } = req.body;
  console.log(req.body)
  connection.query('select * from Student_Details where Student_id = ? ', [stdid], (err, rows) => {
    const {Student_id,Student_name,Student_Gender,Student_Phone_No,Student_Email,Student_Year} = rows[0];
    console.log(rows)
    if (!err) {
      connection.query('INSERT INTO Team_Details SET project_id = ?, student_name = ?,Student_Gender = ?,Student_Phone_No = ?,Student_Email = ?,Student_Year = ?, department = ?, S_ID = ?', 
      [id,Student_name,Student_Gender,Student_Phone_No,Student_Email,Student_Year,department,Student_id], (errr, rowss) => {
        if (!errr) {
          res.redirect('/viewproject/'+id);
        } else {
          console.log(errr);
        }
      });
    } else {
      console.log(err);
    }
  });
}

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
      const id = { id : rows[0].Project_id };
      connection.query('SELECT * FROM Team_Details WHERE project_id = ?', [req.params.id], (err, tdrow) => {
        
        console.log('The data from student_details table: \n', tdrow);
        res.render('view-user', { rows , id, tdrow});
      })
    } else {
      console.log(err);
    }
    console.log('The data from student_details table: \n', rows);
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