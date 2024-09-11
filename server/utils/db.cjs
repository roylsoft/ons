//db.cjs
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase,
  connectionLimit: 1000,
  queueLimit: 0,
  waitForConnections: true,
});

function handleConnectionError(err) {
  if (err) {
    console.log('Connection error');
    console.log(err);
  } else {
    console.log('Connected');
  }
}

module.exports = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, results, fields) => {
        if (err) reject(err);
        else resolve({ results, fields });
      });
    });
  },
  handleConnectionError,
};