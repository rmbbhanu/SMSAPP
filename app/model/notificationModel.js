'user strict';
var sql = require('../db.js');

//notification object constructor
var notification = function(notification){
    this.id=notification.id;
    this.name=notification.name;
    this.class=notification.class;
    this.description=notification.description;
    
};
notification.createnotification = function (newnotification, result) {
        sql.query("INSERT INTO notification set ?", newnotification, function (err, res) {

                if(err) {
                    if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062)
                    {
                        console.log('error: ',err.sqlMessage);
                    }
                    else{
                    console.log("error: ", err);
                    result(err, null);
                    }    
                }
                else if(!err){
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};
notification.getnotificationById = function (id, result) {
        sql.query("Select * from notification where id = ? ", id, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};
notification.getAllnotification = function (result) {
        sql.query("Select * from notification", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                //   console.log('notifications : ', res);

                 result(null, res);
                }
            });
};
notification.updateById = function(id, notification, result){
  sql.query("UPDATE notification SET name=?,class=?,description=? WHERE id = ?", [notification.name,notification.class,notification.description,id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
notification.remove = function(id, result){
     sql.query("DELETE FROM notification WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= notification;
