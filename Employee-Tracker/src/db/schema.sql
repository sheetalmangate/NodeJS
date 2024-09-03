\c postgres

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db

DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL 
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary  DECIMAL NOT NULL,
    department_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id  SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER
);


