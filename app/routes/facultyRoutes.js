'use strict';
module.exports = function(app) {
  var Faculty = require('../controller/facultyController');

  // todoList Routes
  app.route('/faculties')
    .get(Faculty.list_all_faculties)
    .post(Faculty.create_a_faculty);

   app.route('/faculties/:facultyId')
    .get(Faculty.read_a_faculty)
    .put(Faculty.update_a_faculty)
    .delete(Faculty.delete_a_faculty);
    };
