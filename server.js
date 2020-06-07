const mysql = require("mysql");
const inquirer = require("inquirer");

//==============MySQL Connection=================
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

//===============Command Line App/Inquirer===========================
//holds all the inquirer questions
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
          "Update Employee Manager"
        ],
      },
    ])
    .then(function (answer) {
      console.log("You selected", answer);
        switch (answer.action) {
          case "View All Employees":
            viewEmployees();
            break;
          case "View Employees by Department":
            viewByDepartment();
            break;
          case "View Employees by Role":
            viewByRole();
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
            default:

        };

    });
  };

    function viewEmployees() {

    }

    function viewByDepartment() {

    }

    function viewByRole() {


    }

    function addEmployee() {

    }

    function addDepartment() {

    }

    function addRole() {

    }

    function updateRole() {

    }

    function viewByManager(){

    }

    function updateEmployeeManager() {

    }

