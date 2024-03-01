USE iitju;

CREATE TABLE login(
    First_Name varchar(50),
    Last_Name varchar(50),
    Email varchar(200),
    stu_password varchar(20),
    Gender varchar(10)
);

INSERT INTO login(First_Name,Last_Name,Email,stu_password,Gender)
VALUES
('Mehul','Parmar','mehulparmar0507@gmail.com','Mehul@0507%','Male');


CREATE TABLE project_details(
   Project_id int primary key,
   Project_name varchar(200),
   Project_date timestamp,
   Project_link varchar(200),
   Project_Guide varchar(100)
);

CREATE TABLE student_details(
  Student_id int primary key,
  Student_name varchar(100),
  Student_Gender varchar(10),
  Student_Phone_No varchar(10),
  Student_Email varchar(200),
  Student_Year varchar(10)
);

CREATE TABLE team_details(
ID int auto_increment primary key,
project_id int,
student_name varchar(100),
Student_Gender varchar(50),
Student_Phone_No varchar(20), 
Student_Email varchar(200),
Student_Year varchar(10),
Department varchar(100),
S_ID int
);







