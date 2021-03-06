const mysql = require("mysql");
const inquirer = require("inquirer");

//============== MySQL Connection =================
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //calling employee tracker app to start
  generateApp();
});

//================== ET APP ========================
function generateApp() {
  //prompts on how the user would like to use the app
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "generate",
        choices: ["Display All Employee Info",
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Roles",
          "Delete Role",
          "Delete Department",
          "Delete Employee",
          "Exit App",
        ],
      },
    ])
    //generates directive based on user answer
    .then(function (answer) {
      //console.log(answer.generate);
      switch (answer.generate) {
        case "Display All Employee Info":
          displayAllEmployeeInfo();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Departments":
          viewDepartment();
          break;
        case "View All Roles":
          viewRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Roles":
          updateRole();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Exit App":
          connection.end();
          break;
      }
    });
}

//======functions based on selected user answer========================
function displayAllEmployeeInfo(){
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee JOIN role on employee.role_id = role.id JOIN department ON role.department_id = department.id;", function(err, res){
    if(err) throw err;
    console.table(res);
    generateApp();
  })
}

function viewEmployees() {
  console.log("Employee List: \n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    generateApp();
  });
}

function viewDepartment() {
  console.log("Department List:\n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    generateApp();
  });
}

function viewRole() {
  console.log("Employee Roles: \n");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    generateApp();
  });
}

function addEmployee() {
  console.log("Follow prompts to add new employee:\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee's first name:",
        name: "employee_first_name",
      },
      {
        type: "input",
        message: "Enter employee's last name:",
        name: "employee_last_name",
      },
      {
        type: "input",
        message: "Enter employee's single digit role id number:",
        name: "role_id",
      },
      {
        type: "confirm",
        message: "Is the employee a manager?",
        name: "manager",
      },
    ])
    .then(function (answer) {
      const firstName = answer.employee_first_name;
      const lastName = answer.employee_last_name;
      const roleId = answer.role_id;
      const isManager = answer.manager;

      if (isManager) {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the manager ID?",
              name: "manager_id",
            },
          ])
          .then(function (answer) {
            var query = connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manager_id: answer.manager_id,
              },
              function (err, res) {
                if (err) throw err;
                console.log(
                  res.affectedRows +
                    " New Employee has been successfully added!\n"
                );
                generateApp();
              }
            );
          });
      } else {
        var query = connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.employee_first_name,
            last_name: answer.employee_last_name,
            role_id: answer.role_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log(
              res.affectedRows + " New Employee has been successfully added!\n"
            );
            generateApp();
          }
        );
      }
    });
}

function addDepartment() {
  console.log("Follow the prompt to add a new Department:\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department name?",
        name: "department",
      },
    ])
    .then(function (answer) {
      //console.log(answer.department);
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function (err, res) {
          if (err) throw err;
          console.log(
            res.affectedRows + " New Department has been successfully added!\n"
          );
          generateApp();
        }
      );
    });
}

function addRole() {
  console.log("Follow the prompt to add a new Role:\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new role title?",
        name: "role_title",
      },
      {
        type: "input",
        message: "What is the salary of the new role?",
        name: "salary",
      },
      {
        type: "input",
        message: "Please list the department ID for the new role:",
        name: "department_id",
      },
    ])
    .then(function (answer) {
      var query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role_title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err, res) {
          if (err) throw err;
          console.log(
            res.affectedRows + " New Role has been successfully added!\n"
          );
          generateApp();
        }
      );
    });
}

function updateRole() {
  console.log("Follow prompts to update Role: \n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee's id:",
        name: "employee_id",
      },
    ])
    .then(function (answer) {
      const employeeId = answer.employee_id;
      if(employeeId){
      inquirer
        .prompt([
          {
            type: "list",
            message: "Enter employee new role:",
            choices: [
              "Store Manager",
              "Department Manager",
              "Keyholder",
              "Department Lead",
              "Salesperson",
              "Accountant",
              "Cashier",
            ],
            name: "role_type",
          },
          {
            type: "input",
            message: "Enter new salary:",
            name: "salary",
          },
          {
            type: "input",
            message: "Enter department ID:",
            name: "dept_id",
          },
        ])
        .then(function (answer) {
          const roleType = answer.role_type;
          const salary = answer.salary;
          const deptId = answer.dept_id;

          var query = connection.query(
            "UPDATE role SET ? WHERE ?",
            [
              {
                title: roleType,
                salary: salary,
                department_id: deptId,
              },
              {
                id: employeeId,
              },
            ],
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " Role updated!\n");
              // Call deleteRole AFTER the UPDATE completes
              viewRole();
              //deleteRole();
            }
          );
        });
      }
    });
}

//=====BONUS=======
function deleteDepartment() {
  console.log("Follow prompt to delete a Department:\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to delete?",
        name: "delete_dept",
      },
    ])
    .then(function (answer) {
      var dept = answer.delete_dept;
      connection.query(
        "DELETE FROM department WHERE ?",
        {
          name: dept,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department deleted!\n");
          generateApp();
        }
      );
    });
}

function deleteRole() {
  console.log("Follow prompt to delete a Role: \n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID of the role would you like to delete?",
        name: "delete_role",
      },
    ])
    .then(function (answer) {
      var roleId = answer.delete_role;
      connection.query(
        "DELETE FROM role WHERE ?",
        {
          id: roleId,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role deleted!\n");
          generateApp();
        }
      );
    });
}

function deleteEmployee() {
  console.log("Follow prompt to delete Employee: \n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee ID to be deleted?",
        name: "delete_employee",
      },
    ])
    .then(function (answer) {
      var employee = answer.delete_employee;
      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          id: employee,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee deleted!\n");
          generateApp();
        }
      );
    });
}
