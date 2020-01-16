'use strict';
module.exports = function(app) {
  var Course = require('../controller/courseController');

  // todoList Routes
  app.route('/courses')
    .get(Course.list_all_courses)
    .post(Course.create_a_course);

   app.route('/courses/:courseId')
    .get(Course.read_a_course)
    .put(Course.update_a_course)
    .delete(Course.delete_a_course);
    };
