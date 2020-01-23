'user strict';
var sql = require('../db.js');

//Faculty object constructor
var Faculty = function(faculty){
    this.f_id=faculty.f_id;
    this.faculty_name=faculty.faculty_name;
   
    this.email_id=faculty.email_id;
   
    this.department=faculty.department;
   

};
Faculty.createFaculty = function (newFaculty, result) {
        sql.query("INSERT INTO faculty set ?", newFaculty, function (err, res) {

                // if(err) {
                //     console.log("error: ", err);
                //     result(err, null);
                // }
                // else{
                //     console.log(res.insertId);
                //     result(null, res.insertId);
                // }
                if(err) {
                    if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062)
                    {
                        console.log('error: ',err.sqlMessage);
                    }
                    else{
                    console.log("error: ", err);
                    result(err, null);
                    }    
                }
                else if(!err){
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};
Faculty.getFacultyById = function (facultyId, result) {
        sql.query("Select * from faculty where f_id = ? ", facultyId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Faculty.getAllFaculty = function (result) {
        sql.query("Select * from faculty", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                //   console.log('facultys : ', res);

                 result(null, res);
                }
            });
};
Faculty.updateById = function(id, faculty, result){
  sql.query("UPDATE faculty SET faculty_name=?,email_id=?,department=? WHERE f_id = ?", [faculty.faculty_name,faculty.email_id,faculty.department,id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Faculty.remove = function(id, result){
     sql.query("DELETE FROM faculty WHERE f_id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Faculty;
