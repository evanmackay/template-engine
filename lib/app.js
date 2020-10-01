const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");






const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");


const employees = []
function initialQuestions() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "Welcome to our Team Building tool. Please select a role Below.",
            choices: ['Manager', 'Engineer', 'Intern'],
            name: "initial"
        }
    ])
    .then(function(response){
        if (response.initial === 'Manager'){
            managerQuestions()
        } else if (response.initial === 'Engineer') {
            engineerQuestions()
        } else {
            internQuestions()
        }
    })
}
function continuedQuestions() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select a Role below or select Done if you are finished.",
                choices: ['Manager', 'Engineer', 'Intern', 'Done'],
                name: "otherinitial"
            }
        ])
        .then(function(response) {
            if (response.otherinitial === 'Manager') {
                managerQuestions()
            } else if (response.otherinitial === 'Engineer') {
                engineerQuestions()
            } else if (response.otherinitial === 'Intern') {
                internQuestions()
            } else {
                console.log(employees)
                render(employees)
            }
        })
}
function managerQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your Manager's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your Manager's ID number?",
                name: "idnumber"
            },
            {
                type: "input",
                message: "What is your Manager's email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your Manager's office number?",
                name: "officenumber"
            }
        ])
        .then(function(response){
            let manager = new Manager(response.name, response.idnumber, response.email, response.officenumber)
            employees.push(manager)
            continuedQuestions()
        })
        .catch((err) => {
            console.log(err)
        })
    
}
function engineerQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your Engineer's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your Engineer's ID number?",
                name: "idnumber"
            },
            {
                type: "input",
                message: "What is your Engineer's email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your Engineer's GitHub username?",
                name: "githubuser"
            }
        ])
        .then(function(response) {
            let engineer = new Engineer(response.name, response.idnumber, response.email, response.githubuser)
            employees.push(engineer)
            continuedQuestions()
        })
}
function internQuestions() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your Intern's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your Intern's ID number?",
                name: "idnumber"
            },
            {
                type: "input",
                message: "What is your Intern's email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What school did your Intern attend?",
                name: "school"
            }
        ])
        .then(function(response){
            let intern = new Intern(response.name, response.idnumber, response.email, response.school)
            employees.push(intern)
            continuedQuestions()
        })
        .catch((err) => {
            console.log(err)
        })
}
initialQuestions()

    
    


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
