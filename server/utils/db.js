import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';


const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const connection = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase
})

connection.connect(function (err) {
    if (err) {
        console.log('Connection error');
        console.log(err);
    } else {
        console.log('Connected')
    }
})

export default connection