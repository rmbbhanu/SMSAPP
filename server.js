const express = require('express');
const app = express();
//app.use(express.urlencoded())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentDB'
});

// connect to database
mc.connect();
*/
//Student route
var routes1 = require('./app/routes/studentRoutes'); //importing route
//department route
var routes2 = require('./app/routes/departmentRoutes');
//faculty route
var routes3 = require('./app/routes/facultyRoutes');
//course route
var routes4 = require('./app/routes/courseRoutes');
//notification route
var routes5 = require('./app/routes/notificationRoutes');

routes1(app); //register the route
routes2(app); //register the route
routes3(app); //register the route
routes4(app); //register the route
routes5(app);

const port=process.env.PORT || 3000;
const host ='0.0.0.0';
//mysql://b3ca7cfe40e6b8:a3089ee9@us-cdbr-iron-east-05.cleardb.net/heroku_cfe13983b5ea503?reconnect=true

app.listen(port,host,function(){
  console.log('Server started on '+port+'...');
});
