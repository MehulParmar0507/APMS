use iitju;

drop table result;

drop table student;

CREATE TABLE Project_Details(
   Project_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   project_name VARCHAR(500),
   Project_Date TIMESTAMP,
   Project_Link VARCHAR(500),
   Project_Guide VARCHAR(200)
);

INSERT INTO Project_Details(Project_id,project_name,Project_Date,Project_Link,Project_Guide)
VALUES
(1,"Academic Project Management System","24-02-24","https://AcademicProjectManagementSystem.com","A.T.Bhole");


CREATE TABLE Team_Details(
   ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   project_id INT NOT NULL,
   student_name varchar(100),
   Student_Gender VARCHAR(50),
   Student_Phone_No VARCHAR(20),
   Student_Email VARCHAR(200),
   Student_Year VARCHAR(10),
   Department VARCHAR(100),
   S_ID INT NOT NULL
);

INSERT INTO Team_Details SET project_id = ?,student_name = ?,Student_Gender = ?,Student_Phone_No = ?,Student_Email = ?,Student_Year = ?,Department = ?,S_ID = ?


CREATE TABLE Student_Details(
   Student_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   Student_name VARCHAR(100),
   Student_Gender VARCHAR(50),
   Student_Phone_No VARCHAR(20),
   Student_Email VARCHAR(200),
   Student_Year VARCHAR(10)
);

INSERT INTO Student_Details(Student_id,Student_name,Student_Gender,Student_Phone_No,Student_Email,Student_Year)
VALUES
(1,"Ashwin Bari", "Male","2181238729","ashwinbari6@gmail.com","Third Year"),
(2,"Mehul Parmar", "Male","1212132423","mehulparmar0507@gmail.com","Third Year"),
(3,"Jasvantsing Girase", "Male","9231321244","jaswantrajput2002@gmail.com","Third Year"),
(4,"Madhusudan Badgujar", "Male","2224234234","madhusudanbadgujar22@gmail.com","Third Year"),
(5,"Harsh Mishra", "Male","23423342332","harshmishra0607@gmail.com","Third Year"),
(6,"Prashant Mandavkar", "Male","22123123112","prashantmandavkar2102@gmail.com","Third Year"),
(7,"Ketan Mande", "Male","4354534545","ketanmande12@gmail.com","Third Year"),
(8,"Darshan Londhe", "Male","231312332","darshanlondhe142@gmail.com","Third Year"),
(9,"Vaibhav Kotwal", "Male","24234323412","vaibhavkotwal07@gmail.com","Third Year"),
(10,"Shivam More", "Male","231231313321","ShivamMore@gmail.com","Third Year"),
(11,"Gaurav Patil", "Male","342234234","GauravPatil@gmail.com","Third Year"),
(12,"Vivek Mahale", "Male","6556446456","Vivek Mahale@gmail.com","Third Year");


CREATE TABLE Login(
   First_Name VARCHAR(50),
   Last_Name VARCHAR(50),
   Email VARCHAR(200),
   stu_password VARCHAR(10),
   Gender VARCHAR(50)
);

INSERT INTO Login(First_Name,Last_Name,Email,stu_password,Gender)
VALUES
("Mehul","Parmar","mehulparmar0507@gmail.com","Mehul@456%","Male");

INSERT INTO Login(First_Name,Last_Name,Email,stu_password,Gender)
VALUES
("Hetal","Chauhan","hetalchauhan02@gmail.com","hetal@0210","Male");
INSERT INTO Login(First_Name,Last_Name,Email,stu_password,Gender)
VALUES
("Preeti","Sharma","Admin@gmail.com","ISSBT","Female");
INSERT INTO Login(First_Name,Last_Name,Email,stu_password,Gender)
VALUES
("Preeti","Sharma","student@gmail.com","ICOET","Female");
INSERT INTO Login(First_Name,Last_Name,Email,stu_password,Gender)
VALUES
("Preeti","Sharma","guide@gmail.com","ISSBT","Female");