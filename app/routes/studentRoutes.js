'use strict';
module.exports = function(app) {
  var Student = require('../controller/studentController');

  // todoList Routes
  app.route('/students')
    .get(Student.list_all_students)
    .post(Student.create_a_student);

   app.route('/students/id/:studentId')
    .get(Student.read_a_student)
    .put(Student.update_a_student)
    .delete(Student.delete_a_student);

    app.route('/students/name/:studentFname')
     .get(Student.read_a_studentFname)
    };
