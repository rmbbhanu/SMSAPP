'use strict';

var Department = require('../model/departmentModel');

exports.list_all_departments = function(req, res) {
    Department.getAllDepartment(function(err, department) {

    console.log('controller')
    if (err)
      res.send(err);
      // console.log('res', student);
    res.send(department);
  });
};



exports.create_a_department = function(req, res) {
  var new_department = new Department(req.body);

  //handles null error
   if(!new_department.department || !new_department.d_id){

            res.status(400).send({ error:true, message: 'Please provide Department name' });

        }
else{
  Department.createDepartment(new_department, function(err, department) {

    if (err)
      res.send(err);
//    res.json(department);
    res.json({message:'Department added succesfully'})
  });

  }
};


exports.read_a_department = function(req, res) {
  Department.getDepartmentById(req.params.departmentId, function(err, department) {
    if (err)
      res.send(err);
    res.json(department);
  });
};


exports.update_a_department = function(req, res) {
  Department.updateById(req.params.departmentId, new Department(req.body), function(err, department) {
    if (err)
      res.send(err);
    res.json(department);
  });
};


exports.delete_a_department = function(req, res) {


  Department.remove( req.params.departmentId, function(err, department) {
    if (err)
      res.send(err);
    res.json({ message: 'Department successfully deleted' });
  });
};
