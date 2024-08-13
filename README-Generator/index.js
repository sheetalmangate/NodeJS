// TODO: Include packages needed for this application
import fs from 'fs';
import inquirer from "inquirer";
import generateMarkdown  from './utils/generateMarkdown.js';
import generateQuestions from './utils/generateQuestions.js'

// TODO: Create an array of questions for user input
const questions = generateQuestions();


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data , (err) => {
        err ? console.log( err) : console.log('File created successfully');
    });
}

// TODO: Create a function to initialize app
function init() {
    
    inquirer
    .prompt(questions)
    .then((response) => {
        const fileName = 'README.md';
        const data = generateMarkdown(response);
        writeToFile(fileName, data);
       
    });
}

// Function call to initialize app
init();
