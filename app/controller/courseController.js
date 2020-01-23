'use strict';

var Course = require('../model/courseModel.js');

exports.list_all_courses = function(req, res) {
  Course.getAllCourse(function(err, course) {

    console.log('controller')
    if (err)
      res.send(err);
      // console.log('res', course);
    res.send(course);
  });
};



exports.create_a_course = function(req, res) 
{
  var new_course = new Course(req.body);

  //handles null error
  if(!new_course.course_name || !new_course.c_id || !new_course.faculty_name ||!new_course.department  )
  {

    res.status(400).send({ error:true, message: 'Please provide all the fields' });

  }
  else
  {
  Course.createCourse(new_course, function(err, course)
    {
      if (err)
        res.send(err);
      res.json({message:"Course created succesfully"});
    });
  }
};


exports.read_a_course = function(req, res) {
  Course.getCourseById(req.params.courseId, function(err, course) {
    if (err)
      res.send(err);
    res.json(course);
  });
};


exports.update_a_course = function(req, res) {
  Course.updateById(req.params.courseId, new Course(req.body), function(err, course) {
    if (err)
      res.send(err);
    res.json({message:"Course updated succesfully"});
  });
};


exports.delete_a_course = function(req, res) {


  Course.remove( req.params.courseId, function(err, course) {
    if (err)
      res.send(err);
    res.json({ message: 'Course successfully deleted' });
  });
};
