'use strict';
module.exports = function(app) {
  var Department = require('../controller/departmentController');

  // todoList Routes
  app.route('/departments')
    .get(Department.list_all_departments)
    .post(Department.create_a_department);

   app.route('/departments/:departmentId')
    .get(Department.read_a_department)
    .put(Department.update_a_department)
    .delete(Department.delete_a_department);
    };
