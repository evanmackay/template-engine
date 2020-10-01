// files to require
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");





// directories and paths
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// render function to create html
const render = require("./lib/htmlRenderer");

// employees array to be used in render function
const employees = []
// function to ask initial questions to the user
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
    // asks specific questions based on the users pick
    .then(function(response){
        if (response.initial === 'Manager'){
            managerQuestions()
        } else if (response.initial === 'Engineer') {
            engineerQuestions()
        } else {
            internQuestions()
        }
    })
    .catch((err) => {
        console.log(err)
    })
}
// function ran after user has answered questions. allows the user to conitinue to build there team or to publish their work.
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
                // writes the users team file
                console.log('Your team has been built!')
                fs.writeFileSync(outputPath, render(employees), 'utf-8')
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
// manager specific questions
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
// engineer specific questions
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
        .catch((err) => {
            console.log(err)
        })
}
// intern specific questions
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
// runs the initial questions function
initialQuestions()
