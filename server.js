const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table');

const connection = mysql.createConnection({
    host: "employeeTracker",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeTracker_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");

    start();
})

function start(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update An Employee Role',
                'Quit'
            ]
        },
    ])

        .then((response) => {
            switch (response.options) {
                case 'View All Departments':
                    view();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update An Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    break;
            }
        })
}

function view(){
    connection.query("SELECT * FROM department", (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

function viewAllEmployees(){
    connection.query(`
    SELECT employee.id,employee.first_name,employee.last_name,
    role.title,department.name,role.salary,concat(manager.first_name," ",manager.last_name) manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id=department.id
    LEFT JOIN employee manager ON manager.id=employee.manager_id`, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

function viewAllRoles(){
    connection.query("SELECT role.id,role.title,role.salary,department.name FROM role JOIN department ON role.department_id = department.id;", (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Enter The Name Of The Department"
        }
    ])
        .then((response) => {
            connection.query("INSERT INTO department (name) VALUES(?);", response.newDepartment, (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                console.log("Added New Department Successfully");
                initialQuestions();
            })
        })
}

function addRole() {
    connection.query("Select * from department", (err, departmentData) => {
        const departments = departmentData.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        })
        inquirer.prompt([
            {

                type: "input",
                name: "addrole",
                message: "Enter The Role"
            },
            {
                type: "input",
                name: "addsalary",
                message: "Enter The Salary",
            },
            {
                type: "list",
                name: "departmentOptions",
                message: "Enter The Department",
                choices: departments
            }
        ])
            .then((response) => {
                connection.query("INSERT INTO role (title,salary,department_id) VALUES(?,?,?);",
                    [response.addrole, response.addsalary, response.departmentOptions], (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(result);
                        console.log("Added New Role Successfully");
                        initialQuestions();
                    })
            })
    })

}

function addEmployee(){
    connection.query("Select * from role", (err, roleData) => {
        const roles = roleData.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })

        connection.query("Select * from employee", (err, employeeData) => {
            const employees = employeeData.map(employee => {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            })
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstname",
                    message: "Enter The First Name Of The Employee"
                },
                {
                    type: "input",
                    name: "lastname",
                    message: "Enter The Last Name Of The Employee"
                },
                {
                    type: "list",
                    name: "roleoptions",
                    message: "Enter The Role Of The Employee",
                    choices: roles
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who Is The Employee Manager",
                    choices: employees
                }
            ])
                .then((response) => {
                    connection.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?);",
                        [response.firstname, response.lastname, response.roleoptions, response.manager], (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log(result);
                            console.log("Added New Department Successfully");
                            initialQuestions();
                        })
                })
        })
    })

}


function updateEmployeeRole(){
    connection.query("Select * from employee", (err, employeeUpdate) => {

        const employeeupdates = employeeUpdate.map(employee => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }
        })
        connection.query("Select * from role", (err, employeeRoleUpdate) => {
            const roleUpdates = employeeRoleUpdate.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeid",
                    message: "Which Employee Role Do You Want To Update",
                    choices: employeeupdates

                },
                {
                    type: "list",
                    name: "roleid",
                    message: "Which Role Do You Want To assign The Selected Employee",
                    choices: roleUpdates

                }
            ])
                .then((response) => {
                    connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
                        [response.roleid, response.employeeid], (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log(result);
                            console.log("Updated Employee Role Successfully");
                            initialQuestions();
                        })
                })
        })



    })


}