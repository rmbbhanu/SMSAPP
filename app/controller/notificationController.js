'use strict';

var Notification = require('../model/notificationModel.js');

exports.list_all_notifications = function(req, res) {
  Notification.getAllnotification(function(err, notification) {

    console.log('controller')
    if (err)
      res.send(err);
      // console.log('res', notification);
    res.send(notification);
  });
};



exports.create_a_notification = function(req, res) 
{
  var new_notification = new Notification(req.body);

  //handles null error
  if(!new_notification.name || !new_notification.class ||!new_notification.description  )
  {

    res.status(400).send({ error:true, message: 'Please provide all the fields' });

  }
  else
  {
  Notification.createnotification(new_notification, function(err, notification)
    {
      if (err)
        res.send(err);
      res.json({message:"notification created succesfully"});
    });
  }
};


exports.read_a_notification = function(req, res) {
  Notification.getnotificationById(req.params.notificationId, function(err, notification) {
    if (err)
      res.send(err);
    res.json(notification);
  });
};


exports.update_a_notification = function(req, res) {
  Notification.updateById(req.params.notificationId, new Notification(req.body), function(err, notification) {
    if (err)
      res.send(err);
    res.json({message:"notification updated succesfully"});
    // res.json(notification);
  });
};


exports.delete_a_notification = function(req, res) {


  Notification.remove( req.params.notificationId, function(err, notification) {
    if (err)
      res.send(err);
    res.json({ message: 'notification successfully deleted' });
  });
};
