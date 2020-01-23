'user strict';
var sql = require('../db.js');

//Course object constructor
var Course = function(course){
    this.c_id=course.c_id;
    this.course_name=course.course_name;
    this.faculty_name=course.faculty_name;
    this.department=course.department;
    

};
Course.createCourse = function (newCourse, result) {
        sql.query("INSERT INTO course set ?", newCourse, function (err, res) {

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
Course.getCourseById = function (courseId, result) {
        sql.query("Select * from course where c_id = ? ", courseId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Course.getAllCourse = function (result) {
        sql.query("Select * from course", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                //   console.log('courses : ', res);

                 result(null, res);
                }
            });
};
Course.updateById = function(id, course, result){
  sql.query("UPDATE course SET course_name=?,faculty_name=?,department=? WHERE c_id = ?", [course.course_name,course.faculty_name,course.department,id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Course.remove = function(id, result){
     sql.query("DELETE FROM course WHERE c_id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Course;
