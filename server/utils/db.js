import mysql from 'mysql2';

const connection=mysql.createConnection({
    host:'localhost',
    user:'musk',
    password:'musk',
    database:'note'
})

connection.connect(function(err){
    if(err){
        console.log('Connection error');
        console.log(err);
    } else{
        console.log('Connected')
    }
})

export default connection