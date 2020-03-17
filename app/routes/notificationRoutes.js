'use strict';
module.exports = function(app) {
  var Notification = require('../controller/notificationController');

  // todoList Routes
  app.route('/notifications')
    .get(Notification.list_all_notifications)
    .post(Notification.create_a_notification);

   app.route('/notifications/:notificationId')
    .get(Notification.read_a_notification)
    .put(Notification.update_a_notification)
    .delete(Notification.delete_a_notification);
    };
