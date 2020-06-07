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
  trackEmployee();
});

//===============Command Line App/Inquirer===========================
//holds all the inquirer questions
function trackEmployee() {
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
    .then(function (answers) {
      console.log("You selected", answers);
        
    });


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
}
