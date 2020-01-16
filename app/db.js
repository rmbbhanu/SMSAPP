'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    user     : 'b3ca7cfe40e6b8',
    password : 'a3089ee9',
    database : 'heroku_cfe13983b5ea503'
});
//mysql://b3ca7cfe40e6b8:a3089ee9@us-cdbr-iron-east-05.cleardb.net/heroku_cfe13983b5ea503?reconnect=true
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