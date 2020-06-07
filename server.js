const mysql = require("mysql");
const inquirer = require("inquirer");
const table = "#";

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
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Role",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Roles",
          "View All Employees by Manager",
          "Update Employee Manager",
          "Delete Role",
          "Delete Department", 
          "Delete Employee",
          "Exit App"
        ],
      },
    ])
    //generates directive based on user answer
    .then(function (answer) {
      console.log(answer.generate);
        switch (answer.generate) {
          case "View All Employees":
            viewEmployees();
            break;
          case "View Department":
            viewDepartment();
            break;
          case "View Roles":
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
          case "View All Employees by Manager":
            viewByManager();
            break;
          case "Update Employee Manager":
            updateEmployeeManager();
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
        };

    });
  };

  //======functions based on selected user answer========================
    function viewEmployees() {
      console.log("you want to view employee")
      //SELECT first_name, last_name FROM employee;
      
    }

    function viewDepartment() {
      console.log("view department")
      //SELECT employee FROM department;
    }

    function viewRole() {
      console.log("view roles")
      //SELECT role
    }

    function addEmployee() {
      console.log("add employee")
      //INSERT INTO employee
      //VALUE
    }

    function addDepartment() {
      console.log("add depart")
      //INSERT INTO department
      //VALUE
    }

    function addRole() {
      console.log("add role")
      //INSERT INTO
      //VALUE
    }

    function updateRole() {
      console.log("update role")
      //UPDATE products SET ? WHERE ?
      //

    }

    function viewByManager(){
      console.log("view by manager")
      //SELECT 
    }

    function updateEmployeeManager() {
      console.log("update employeee manag")
      //UPDATE products SET ? WHERE ?

    }

    //=====BONUS=======
    function deleteDepartment(){

    }

    function deleteRole(){

    }

    function deleteEmployee(){

    } 

