//import inquirer from 'inquirer';

const generateQuestions = () => {
    
    const questions = [
        {
            type : 'list',
            name : 'choice',
            message : 'What would you like to do?',
            choices : [
                {
                    name:"View All Departments",
                    value:"VIEW_DEPARTMENT"
                },
                {
                    name:"View All Roles",
                    value:"VIEW_ROLES"
                },
                {
                    name:"View All Employee",
                    value:"VIEW_EMPLOYEE"
                },
                {
                    name:"Add Employee",
                    value:"ADD_EMPLOYEE"
                },
                {
                    name:"Add Roles",
                    value:"ADD_ROLE"
                },
                {
                    name:"Add Department",
                    value:"ADD_DEPARTMENT"
                },
                {
                    name:"Update Employee Role",
                    value:"UPDATE_EMP_ROLE"
                },
                {
                    name:"Update Employee Manager",
                    value:"UPDATE_EMP_MANAGER"
                },
                {
                    name:"View Employee By Manager",
                    value:"VIEW_EMP_BY_MANAGER"
                },
                {
                    name:"View Employee By Department",
                    value:"VIEW_EMP_BY_DEPARTMENT"
                },
                {
                    name:"Delete Department",
                    value:"DELETE_DEPARTMENT"
                },
                {
                    name:"Delete Role",
                    value:"DELETE_ROLE"
                },
                {
                    name:"Delete Employee",
                    value:"DELETE_EMPLOYEE"
                },
                {
                    name:"Quit",
                    value:"QUITE"
                }
            ],
        }
    ];

    return questions;
}

export default generateQuestions;
