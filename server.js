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
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Roles",
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
        };

    });
  };

  //======functions based on selected user answer========================
    function viewEmployees() {
      console.log("Employee List: ")
      connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        console.table(res);
        generateApp();
      })
    }

    function viewDepartment() {
      console.log("Department List: ")
      connection.query("SELECT * FROM department", function(err, res){
        if (err) throw err;
        console.table(res);
        generateApp();
      })
    }

    function viewRole() {
      console.log("Employee Roles List: ")
      connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
        generateApp();
      })
    }

    function addEmployee() {
      console.log("Follow prompts to add new employee: ");
      inquirer.prompt([
        {
          type: "input",
          message: "Enter employee's first name:",
          name: "employee_first_name"
        },
        {
          type: "input",
          message: "Enter employee's last name:",
          name: "employee_last_name"
        },
        {
          type: "input",
          message: "Enter employee's single digit role id number:",
          name: "role_id"
        },
        {
          type: "confirm",
          message: "Is the employee a manager?",
          name: "manager"
        }
      ]).then(function(answers){
        console.log(answers.manager)
        if(answers.manager){
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter manager's id number:",
                name: "manager_id"
              }

          ]).then(function(answer){
            console.log(answer.manager_id);
            var query = connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answers.employee_first_name,
                last_name: answers.employee_last_name,
                role_id: answers.role_id,
                manager_id: answer.manager_id
              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " New Employee has been successfully added!");
                generateApp();
              }
            );
            console.log(query.sql);
          })

        }else{
          var query = connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.employee_first_name,
                last_name: answer.employee_last_name,
                role_id: answer.role_id,
              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " New Employee has been successfully added!");
                generateApp();
              }
            );
          console.log(query.sql);
        }
      })
      
     
    }
    //havent gotten managers option working correctly yet

    function addDepartment() {
      console.log("Follow the prompt to add a new Department:")
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the department name?",
            name: "department"
          }
        ]).then(function(answer){
          console.log(answer.department);
            var query = connection.query(
              "INSERT INTO department SET ?",
              {
                name: answer.department
              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " New Department has been successfully added!");
                generateApp();
              }
            );
            console.log(query.sql);
        })
    }

    function addRole() {
      console.log("Follow the prompt to add a new Role:")
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the new role title?",
            name: "role_title"
          },
          {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary"
          },
          {
            type: "input",
            message: "Please list the department ID for the new role:",
            name: "department_id"
          }
        ]).then(function(answer){
            var query = connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.role_title,
                salary: answer.salary,
                department_id: answer.department_id
              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " New Role has been successfully added!");
                generateApp();
              }
            );
            console.log(query.sql);
        })
    }

    function updateRole() {
      console.log("update role")
      
      //UPDATE products SET ? WHERE ?
      //

    }


    //=====BONUS=======DELETE
    function deleteDepartment(){
      console.log("delete department selected")
      
    }

    function deleteRole(){
      console.log("delete role selected")
      
    }

    function deleteEmployee(){
      console.log("delete employee selected")
      
    } 

  
