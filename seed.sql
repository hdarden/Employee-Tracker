USE employee_trackerDB;

INSERT INTO department (name);
VALUES ("Footwear"),
("Apparel"),
("Front End"),
("Team Sports")
("Fitness"),
("Bikes"),
("Outdoor Sports");

INSERT INTO role (title, salary, department_id);
VALUES ("Store Manager", 90,000, 1)
("Department Manager", 75,000, 1),
("Keyholder", 50,000, 2),
("Department Lead", 40,000, 2),
("Salesperson", 25,000, 3),
("Accountant", 75,000, 4),
("Human Resources", 60,000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id);
VALUES ("Helen", "Taylor", 1, 1234),
("Sallie", "Jane", 2, NULL),
("Sara", "Plummer", 1, 2345),
("Wesley", "Grubb", 4, NULL),
("Dwayne", "Johnson", 3, NULL),
("Jennifer", "Gardner", 3, NULL);