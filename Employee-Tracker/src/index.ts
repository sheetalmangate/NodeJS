import inquirer from 'inquirer';
import generateQuestions from './utils/generateQuestions.js';
import db from './config/connection.js';
import console from "node:console";

//check how to use console.table in node.js => import consol.table
//asciiart-logo : 3.20

//Function to initialize app
const init = async () => {

    //Create an array of questions for user input
    const questions = generateQuestions();

    await inquirer
    .prompt(questions)
    .then( ( answer ) => {

        const {choice} = answer;
        
        switch(choice) {

            case "VIEW_DEPARTMENT":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEE":
                viewEmployee();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "UPDATE_EMP_ROLE":
                updateEmpoyeeRole();
                break;
            case "UPDATE_EMP_MANAGER":
                updateEmployeeManager();
                break;
            case "VIEW_EMP_BY_MANAGER":
                viewEmployeeByManager();
                break;
            case "VIEW_EMP_BY_DEPARTMENT":
                viewEmployeeByDepartment();
                break;
            case "QUITE" :
                db.end();
                break;
        }
    });

}

// Helper functions


const viewDepartments = async () => {

    const data = await db.query( 'SELECT * FROM department');
    console.table(data.rows);
    await init();

};


const viewRoles = async () => {
   
    const sql = `SELECT role.title, role.id, dept.name as department, role.salary
                FROM role  
                LEFT JOIN department dept 
                ON role.department_id = dept.id `;

    const role = await db.query(sql);
    console.table(role.rows);
    init();
}


const viewEmployee = async () => {

    const sql = `SELECT 
                    emp.id, concat(emp.first_name,' ', emp.last_name ) as Name, role.title, role.salary,
                    dept.name as Department, concat(emp1.first_name,' ',emp1.last_name) as Manager
                FROM employee emp
                INNER JOIN role ON (emp.role_id = role.id)
                INNER JOIN department dept ON ( role.department_id = dept.id )
                LEFT JOIN employee emp1 ON ( emp.manager_id = emp1.id)
                ORDER BY emp.id ASC`;

    const employee = await db.query(sql);
    console.table(employee.rows);
    init();

}

const addEmployee = async () => {

    const roles = await db.query('SELECT id as value, title as name FROM role');
    const employee = await db.query("SELECT id as value, first_name || ' ' || last_name as name FROM employee ");
   
    inquirer
    .prompt([
        {
            type:"input",
            message:"What is employee's first name?",
            name:"first_name"
        },
        {
            type:"input",
            message:"What is employee's last name?",
            name:"last_name"
        },
        {
            type:"list",
            message:"Select employee's role",
            name:"role_id",
            choices:roles.rows
        },
        {
            type:"list",
            message:"Select employee's manager",
            name:"manager_id",
            choices:employee.rows
        }
    ])
    .then(({first_name, last_name, role_id, manager_id }) => {
    
    
        db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1,$2,$3,$4)', 
            [first_name, last_name, role_id, manager_id], (err, result) => {
           
            let message = 'Unable to add employee'
            
            if(err) {
                console.log(err);
                return;
            }

            if(result.rowCount === 1) {
                message = 'Employee added successfully ';
            }
        
            console.log(message) 
            init();

        });        
    })
    
};


const addDepartment = async () => {
    inquirer
    .prompt([
        {
            type:'input',
            name:'name',
            message:'Please enter the name of the Department'
        }
    ])
    .then(({name}) => {
        
        db.query('INSERT INTO department(name) VALUES($1)',[name],(err, result) => {

        if(err) {
            console.log(err);
            return;
        }

        let message = "Unable to add department";
        
        if(result.rowCount === 1 ) message = "Department added successfully";

        console.log(message);
        init();
    });
});
   
}

const addRole = async () => {

    const department = await db.query('SELECT id as value, name FROM department');
   
    inquirer
    .prompt([
        {
            type:"input",
            name:"title",
            message:"Please enter the title of the role"
        },
        {
            type:"input",
            name:"salary",
            message:"Please enter the salary for the role"
        },
        {
            type:"list",
            name:"department_id",
            message:"Please select department for th role",
            choices:department.rows
        }
    ])
    .then(({ title, salary, department_id})=>{

        db.query('INSERT INTO role(title, salary, department_id) VALUES($1,$2,$3) ',
            [title,salary,department_id], (err, result) => {
                if(err) {
                    console.log(err);
                    return;
                }

                let message = "Unable to add new role.";
                if(result.rowCount === 1 ) message = "New role added successfully";
                console.log(message);
                init();
            });
    });
    
}

const updateEmpoyeeRole = async () => {

    const employee = await db.query("SELECT id as value, first_name || ' ' || last_name as name FROM employee ");

    const roles = await db.query("SELECT id as value, title as name FROM role");

    inquirer
    .prompt([
        {
            type:"list",
            name:"employee_id",
            message:"Please select employee to update role",
            choices:employee.rows
        },
        {
            type:"list",
            name:"role_id",
            message:"Please select role",
            choices:roles.rows
        }

    ])
    .then( ({employee_id, role_id}) => {
        
        db.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`,[],(err,result)=>{

            if(err) {
                console.log(err);
                return;
            }

            let message = 'Something went wrong ';
            if( result.rowCount === 1 ) message = 'Role for employee updated successfully';

            console.log(message);
            init();
        });
    });
}


const updateEmployeeManager = async () => {

    const employee = await db.query("SELECT id as value, first_name || ' ' || last_name as name FROM employee ");

    inquirer
    .prompt([
        {
            type:"list",
            message:"Select employee to update manager",
            name:"employee_id",
            choices:employee.rows
        },
        {
            type:"list",
            message:"Select manager",
            name:"manager_id",
            choices:employee.rows
        },

    ])
    .then(({employee_id, manager_id}) => {

        const sql = `UPDATE employee SET manager_id = ${manager_id} WEHRE id = ${employee_id} `;

        db.query(sql,[],(err,result) => {

            if(err) {
                console.log(err);
                return;
            }

            let message = "Unable to update manager";
            if(result.rowCount === 1 ) message = "Manager updated successfully";
            console.log(message);
            init();
        });
    });
}

const viewEmployeeByManager = async() => {

    const sql = `SELECT 
                    manager.first_name || ' ' || manager.last_name as manager, 
                    emp.id as employee_id, 
                    emp.first_name || ' ' || emp.last_name as employee_name
                FROM employee emp
                LEFT JOIN employee manager ON emp.manager_id = manager.id 
                WHERE emp.manager_id is not null
                ORDER by manager.first_name ASC`;

    const employee = await db.query( sql );

    console.table(employee.rows);

    init();

}

const viewEmployeeByDepartment = async() => {

    const sql = `SELECT 
                    dept.name as department_name, 
                    emp.id as employee_id, 
                    emp.first_name || ' ' || emp.last_name as employee_name
                FROM employee emp
                INNER JOIN role ON (emp.role_id = role.id)
                INNER JOIN department dept ON ( role.department_id = dept.id )
                ORDER BY dept.name ASC;`;
    const employee = await db.query(sql);
    console.table(employee.rows);
    init()

}

//Function call to initialize app
init();

