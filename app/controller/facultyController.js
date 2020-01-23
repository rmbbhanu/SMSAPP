'use strict';

var Faculty = require('../model/facultyModel.js');

exports.list_all_faculties = function(req, res) {
  Faculty.getAllFaculty(function(err, faculty) {

    console.log('controller')
    if (err)
      res.send(err);
      // console.log('res', faculty);
    res.send(faculty);
  });
};



exports.create_a_faculty = function(req, res) {
  var new_faculty = new Faculty(req.body);

  //handles null error
   if(!new_faculty.faculty_name || !new_faculty.f_id){

            res.status(400).send({ error:true, message: 'Please provide faculty id' });

        }
else{

  Faculty.createFaculty(new_faculty, function(err, faculty) {

    if (err)
      res.send(err);
    res.json({message:"Faculty created succesfully"});
  });

  }
};


exports.read_a_faculty = function(req, res) {
  Faculty.getFacultyById(req.params.facultyId, function(err, faculty) {
    if (err)
      res.send(err);
    res.json(faculty);
  });
};


exports.update_a_faculty = function(req, res) {
  Faculty.updateById(req.params.facultyId, new Faculty(req.body), function(err, faculty) {
    if (err)
      res.send(err);
    res.json({message:"Faculty updated succesfully"});
  });
};


exports.delete_a_faculty = function(req, res) {


  Faculty.remove( req.params.facultyId, function(err, faculty) {
    if (err)
      res.send(err);
    res.json({ message: 'Faculty successfully deleted' });
  });
};
