'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'studentDB'
});

// connection.connect(function(err) {
//     if (err) throw err;
connection.connect((err) =>{
    if(err) throw err;
    console.log("mysql connected..");
connection.query("SELECT 1 + 1",(err,rows)=>{ /* */ });

connection.on('error',function(err){
    console.log("[mysql error]",err);
});
// keep connection alive
setInterval(function () {
    connection.query('SELECT 1');
    console.log('Keep alive the connection.');
}, 30000);
});
module.exports = connection;