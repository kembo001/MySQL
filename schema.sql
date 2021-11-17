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
VALUES ("Office Manager",100000.00,1),
       ("Director",80000.00,1),
       ("Account Manager",160000.00,2),
       ("Accountant",125000.00,2),
       ("Teacher",150000.00,3),
       ("Software Engineer",120000.00,3),
       ("Quataerback",250000.00,4),
       ("Doctor",190000.00,4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Brandon","Kemboi",1,null),
       ("Yafet","Berhane",2,0002),
       ("Arwen","Post",2,0003),
       ("Jaden","Watson",4,0004),
       ("Brianna","Sugut",3, null),
       ("Kirk","Cousins",4,0006),
       ("Justin","Jefferson",5,null),
       ("Tom","Ford",6,0005);