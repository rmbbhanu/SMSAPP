'user strict';
var sql = require('../db.js');

//Department object constructor
var Department = function(department){
    this.d_id=department.d_id;
    this.department=department.department;
    this.hod=department.hod;

};
Department.createDepartment = function (newDepartment, result) {
        sql.query("INSERT INTO departments set ?", newDepartment, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};
Department.getDepartmentById = function (departmentId, result) {
        sql.query("Select * from departments where d_id = ? ", departmentId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Department.getAllDepartment = function (result) {
        sql.query("Select * from departments", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                //   console.log('departments : ', res);

                 result(null, res);
                }
            });
};
Department.updateById = function(id, department, result){
  sql.query("UPDATE departments SET department=?,hod=? WHERE d_id = ?", [department.department,department.hod,id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Department.remove = function(id, result){
     sql.query("DELETE FROM departments WHERE d_id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Department;
