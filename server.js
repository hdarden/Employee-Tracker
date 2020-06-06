const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_trackerDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //calling employee tracker app to start
    trackEmployee();
  });

  function trackEmployee(){
    inquirer
    .prompt([
      {
          type: "list",
          message: "What would you like to do?",
          name: "generate",
          choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"] 

      }, 
    ]).then(function(answers){
      console.log(answers)

    });
  


  }