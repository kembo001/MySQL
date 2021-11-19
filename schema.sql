DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);  

INSERT INTO department(name)
VALUES("HR"), ("Tech"), ("Admin"), ("Management");

INSERT INTO role(title, salary, department_id)
VALUES ("Office Manager",45345,1),
       ("Director",343464,2),
       ("Account Manager",346346,3),
       ("Accountant",4363463,4),
       ("Teacher",3464346,5),
       ("Software Engineer",43634535,6),
       ("Quataerback",5346434,7),
       ("Doctor",463345356,8);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Brandon","Kemboi",1,null),
       ("Yafet","Berhane",2,0002),
       ("Arwen","Post",2,0003),
       ("Jaden","Watson",4,0004),
       ("Brianna","Sugut",3, null),
       ("Kirk","Cousins",4,0006),
       ("Justin","Jefferson",5,null),
       ("Tom","Ford",6,0005);
