const mysql = require("mysql2");

const pool= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"BookSync",
    database:"booksync",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

pool.getConnection((err, connection) => {
    if(err){
        console.error("error al conectar la base de datos:", err.message);
        process.exit(1);
    }
    console.log("conectado a la base de datos");
    connection.release();    
})

module.exports = pool.promise();