'user strict';
var sql = require('../db.js');

//Student object constructor
var Student = function(student){
    this.s_id=student.s_id;
    this.fname=student.fname;
    this.lname=student.lname;
    this.email_id=student.email_id;
    this.roll_no=student.roll_no;
    this.class=student.class;
    this.department=student.department;
    this.semester=student.semester;
    this.address=student.address;

};
Student.createStudent = function (newStudent, result) {
        sql.query("INSERT INTO students set ?", newStudent, function (err, res) {

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
Student.getStudentById = function (studentId, result) {
        sql.query("Select * from students where s_id = ? ", studentId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Student.getAllStudent = function (result) {
        sql.query("Select * from students", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                //   console.log('students : ', res);

                 result(null, res);
                }
            });
};
Student.updateById = function(id, student, result){
  sql.query("UPDATE students SET fname=?,lname=?,roll_no=?,department=?,email_id=?,semester=?,address=?,class=? WHERE s_id = ?", [student.fname,student.lname,student.roll_no,student.department,student.email_id,student.semester,student.address,student.class,id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Student.remove = function(id, result){
     sql.query("DELETE FROM students WHERE s_id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Student;
