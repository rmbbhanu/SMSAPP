const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(fileUpload());
app.set('view engine', 'ejs');


var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'khwajaavais.l@somaiya.edu',
        pass: 'Khwajaavais_007'
    }
    // host: "smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "1a2b3c4d5e6f7g",
    //   pass: "1a2b3c4d5e6f7g"
    // }
});
var order;

app.get('/', function (request, response) {
    // response.sendFile(__dirname + '/index');

    var request = require('request');

    var options = {
        'method': 'GET',
        'url': 'https://infinite-garden-28674.herokuapp.com/notifications',
        'headers': {}
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        console.log(response.body);


        var res1 = JSON.parse(response.body);
        order = res1;
    });
    response.render("index");
});
app.get('/student', function (request, response) {
    response.redirect("/");
});

app.get("/faculty", function (req, res) {
    res.redirect("/");
});

app.get("/admin", function (req, res) {
    res.redirect("/");
});



app.post('/index.html', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var usertype = request.body.userType;
    var apiLink = 'https://sleepy-peak-36509.herokuapp.com/api/';
    var apiPath = "";
    console.log(usertype);
    if (usertype == "student") {
        apiPath = 'studentLogin';
    } else if (usertype == "admin") {
        apiPath = 'adminLogin';
    } else {
        apiPath = 'facultyLogin';
    }

    axios.post(apiLink + apiPath, {
            username: username,
            password: password
        })
        .then((res) => {
            console.log(`statusCode: ${res.statusText}`)
            var code = res.data.code;
            //console.log(text)
            if (code === 200) {
                console.log(code);

                if (usertype == "student") {
                    // response.sendFile(__dirname + "/models/student");

                    console.log(order);
                    response.render("student", {
                        order: order
                    });


                    //<%= class_name %>
                } else if (usertype == "faculty") {

                    // response.sendFile(__dirname + "/models/faculty");
                    response.render("faculty");
                } else {
                    // response.sendFile(__dirname + "/models/admin");
                    response.render("admin");
                }
            } else {
                console.log(code);
                response.redirect("/")
            }
        })
        .catch((error) => {
            console.error(error)
        })
});
app.post('/faculty_assignment', function (req, res) {
    var file = req.files.uploaded_image;
    var img_name = file.name;
    var class_name = req.body.deptclass;
    console.log(class_name);
    var cid = Math.ceil(Math.random() * 100);
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

        file.mv('uploads/' + file.name, function (err) {
            if (err) {
                return res.status(500).send(err);
            } else {
                var mailOptions = {
                    from: 'khwajaavais.l@somaiya.edu', //"Example Team" <from@example.com>
                    to: 'rmb1@somaiya.edu, vrushil.g@somaiya.edu', //thankyou khwaja
                    subject: 'Assignment',
                    html: `Hey ${class_name}, here is the text that will represent details of Assignment`,
                    attachments: [{
                        filename: img_name,
                        path: __dirname + '/uploads/' + img_name,
                        cid: cid + img_name
                    }]
                };

                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }else{
                        console.log('Message sent: %s', info.messageId);
                       
                    }
                });
            }
        });
        // res.sendFile(__dirname + "/index");
       
    } else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    }
    res.render("faculty");
   
});
app.post("/faculty_redirect", function (req, res) {
    var sender_name = req.body.s_name;
    var dept_announce = req.body.dept_announce;
    var announce_description = req.body.announce_description;

    console.log(sender_name);
    console.log(dept_announce);
    console.log(announce_description);

    var request = require('request');
    //api call to post notification into db
    var options = {
        'method': 'POST',
        'url': 'https://infinite-garden-28674.herokuapp.com/notifications',
        'headers': {},
        form: {
            'name': sender_name,
            'class': dept_announce,
            'description': announce_description
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });


    res.render("faculty");

});
// app.post(function (req, res) {
//     if (req.url == '/fileupload') {
//       var form = new formidable.IncomingForm();
//       form.parse(req, function (err, fields, files) {
//         var oldpath = files.filetoupload.path;
//         var newpath = 'C:/Users/Vrushil Gajra/Desktop/webloginchatbot/uploads/' + files.filetoupload.name;
//         fs.rename(oldpath, newpath, function (err) {
//           if (err) throw err;
//           res.write('File uploaded and moved!');
//           res.end();
//         });
//    });
//     } else {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//       res.write('<input type="file" name="filetoupload"><br>');
//       res.write('<input type="submit">');
//       res.write('</form>');
//       return res.end();
//     }
//   }); 
const port=process.env.PORT || 4000;
const host ='0.0.0.0';
//mysql://b3ca7cfe40e6b8:a3089ee9@us-cdbr-iron-east-05.cleardb.net/heroku_cfe13983b5ea503?reconnect=true

app.listen(port,host,function(){
  console.log('Server started on '+port+'...');
});
