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
      connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        console.table(res);
        
      })
    }

    function viewDepartment() {
      console.log("view department")
      var query = connection.query(

        );
        console.log(query.sql);
      //SELECT employee FROM department;
    }

    function viewRole() {
      console.log("view roles")
      var query = connection.query(

        );
        console.log(query.sql);
      //SELECT role
    }

    function addEmployee() {
      console.log("add employee")
      var query = connection.query(

        );
        console.log(query.sql);
      //INSERT INTO employee
      //VALUE
    }

    function addDepartment() {
      console.log("add depart")
      var query = connection.query(

        );
        console.log(query.sql);
      //INSERT INTO department
      //VALUE
    }

    function addRole() {
      console.log("add role")
      var query = connection.query(

        );
        console.log(query.sql);
      //INSERT INTO
      //VALUE
    }

    function updateRole() {
      console.log("update role")
      var query = connection.query(

        );
        console.log(query.sql);
      //UPDATE products SET ? WHERE ?
      //

    }

    function viewByManager(){
      console.log("view by manager")
      var query = connection.query(

        );
        console.log(query.sql);
      //SELECT 
    }

    function updateEmployeeManager() {
      console.log("update employeee manag")
      var query = connection.query(

        );
        console.log(query.sql);
      //UPDATE products SET ? WHERE ?

    }


    //=====BONUS=======DELETE
    function deleteDepartment(){
      console.log("delete department selected")
      var query = connection.query(

        );
        console.log(query.sql);

    }

    function deleteRole(){
      console.log("delete role selected")
      var query = connection.query(

        );
        console.log(query.sql);

    }

    function deleteEmployee(){
      console.log("delete employee selected")
      var query = connection.query(

        );
        console.log(query.sql);

    } 

  
