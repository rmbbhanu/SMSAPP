'use strict';

var Student = require('../model/studentModel.js');

exports.list_all_students = function(req, res) {
  Student.getAllStudent(function(err, student) {

    console.log('controller')
    if (err)
      res.send(err);
      // console.log('res', student);
    res.send(student);
  });
};



exports.create_a_student = function(req, res) {
  var new_student = new Student(req.body);

  //handles null error
//    if(!new_student.student || !new_student.roll_no){

//             res.status(400).send({ error:true, message: 'Please provide student rollno' });

//         }
// else{

  Student.createStudent(new_student, function(err, student) {

    if (err)
      res.send(err);
    res.json(student);
  });

};


exports.read_a_student = function(req, res) {
  Student.getStudentById(req.params.studentId, function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.update_a_student = function(req, res) {
  Student.updateById(req.params.studentId, new Student(req.body), function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.delete_a_student = function(req, res) {


  Student.remove( req.params.studentId, function(err, student) {
    if (err)
      res.send(err);
    res.json({ message: 'Student successfully deleted' });
  });
};
