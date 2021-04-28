const axios = require("axios");
const fetch = require("node-fetch");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var nodemailer = require("nodemailer");
var path = require("path");
const request = require("request");
// const { json } = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(fileUpload());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

async function apiCallFunction(method, baseURL, category) {
  try {
    let response = await fetch(baseURL + category, {
      method: method,
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      // body: body
    });
    let result = await response.json();
    // console.log(result)
    return result;
  } catch (e) {
    console.log(e);
    alert(e);
  }
}
async function apiCallForPost(baseURL, category, body) {
  try {
    let response = await fetch(baseURL + category, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: body,
    });
    let result = await response.json();
    // console.log(result)
    return result;
  } catch (e) {
    console.log(e);
    alert(e);
  }
}
const baseURLAPI = "https://stark-fortress-47961.herokuapp.com/";

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "help.sms2020@gmail.com",
    pass: "help@1234",
  },
  // host: "smtp.mailtrap.io",
  // port: 2525,
  // auth: {
  //   user: "1a2b3c4d5e6f7g",
  //   pass: "1a2b3c4d5e6f7g"
  // }
});
var order;
// var students;
// var courses;
// var faculties;
// var departments;
// var attendance;

app.get("/", function (request, response) {
  // response.sendFile(__dirname + '/index');
  var request = require("request");
  var options = {
    method: "GET",
    url: "https://stark-fortress-47961.herokuapp.com/notifications",
    headers: {},
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var res1 = JSON.parse(response.body);
    order = res1;
  });
  response.render("index");
});
app.get("/student", function (request, response) {
  response.redirect("/");
});

app.get("/faculty", function (req, res) {
  res.redirect("/");
});

app.get("/admin", function (req, res) {
  res.redirect("/");
});

app.get("/faculty_chatbot.html", function (req, res) {
  // res.render("faculty_chatbot");
  res.sendFile(__dirname + "/faculty_chatbot.html");
});

app.get("/admin_index", function (req, res) {
  // res.render("faculty_chatbot");
//   apiCallFunction("GET", baseURLAPI, "faculties/count")
//     .then(
//       (data) => {
//         let facultyCount = data[0]["COUNT(*)"];
//         console.log(facultyCount);
//         res.render("./admin_panel/admin_index");
//       })
//     .catch((err) => {
//       console.error(err);
//     });
    res.render("./admin_panel/admin_index");

});

app.get("/admin_pages", function (req, res) {
  // res.render("faculty_chatbot");
  res.render("./admin_panel/admin_pages");
});

app.get("/admin_faculty", function (req, res) {
  apiCallFunction("GET", baseURLAPI, "faculties/")
    .then((data) =>
      res.render("./admin_panel/admin_faculty", {
        //  count_faculty: data.length,
        faculties: data,
      })
    )
    .catch((error) => {
      console.error(error);
    });
});

app.get("/admin_student", function (req, res) {
  apiCallFunction("GET", baseURLAPI, "students/")
    .then((data) =>
      res.render("./admin_panel/admin_student", {
        students: data,
      })
    )
    .catch((error) => {
      console.error(error);
    });
});
app.get("/admin_course", function (req, res) {
  apiCallFunction("GET", baseURLAPI, "courses/")
    .then((data) =>
      res.render("./admin_panel/admin_course", {
        courses: data,
      })
    )
    .catch((error) => {
      console.error(error);
    });
});

app.get("/admin_department", function (req, res) {
  apiCallFunction("GET", baseURLAPI, "departments/")
    .then((data) =>
      res.render("./admin_panel/admin_department", {
        departments: data,
      })
    )
    .catch((error) => {
      console.error(error);
    });
});

app.get("/admin_attendance", function (req, res) {
  apiCallFunction("GET", baseURLAPI, "attendance/")
    .then((data) =>
      res.render("./admin_panel/admin_attendance", {
        attendance: data,
      })
    )
    .catch((error) => {
      console.error(error);
    });
});

app.get("/admin_faculty_announcement", function (req, res) {
  apiCallFunction("GET", baseURLAPI, "notifications/")
    .then(
      (data) =>
        res.render("./admin_panel/admin_faculty_announcement", {
          notifications: data,
        }),
      console.log("announcement renederd")
    )
    .catch((error) => {
      console.error(error);
    });
});

app.get("/index", function (req, res) {
  res.render("index");
});

app.post("/index.html", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  // var usertype = request.body.userType;
  var usertype = request.body;

  // var apiLink = 'https://sleepy-peak-36509.herokuapp.com/api/';
  // var apiPath = "";
  console.log(usertype);
  if (usertype.Student == "student") {
    // apiPath = 'studentLogin';
    response.render("student", {
      order: order,
    });
  } else if (usertype.Admin == "admin") {
    // apiPath = 'adminLogin';
    response.render("./admin_panel/admin_index");
  } else {
    // apiPath = 'facultyLogin';
    response.render("faculty");
  }

  // axios.post(apiLink + apiPath, {
  //         username: username,
  //         password: password
  //     })
  //     .then((res) => {
  //         console.log(`statusCode: ${res.statusText}`)
  //         var code = res.data.code;
  //         //console.log(text)
  //         if (code === 200) {
  //             console.log(code);

  //             if (usertype.Student == "student") {
  //                 console.log(order);
  //                 response.render("student", {
  //                     order: order
  //                 });
  //             } else if (usertype.Faculty == "faculty") {
  //                     response.render("faculty");
  //             } else {
  //                 response.render("./admin_panel/admin_index");
  //             }
  //         } else {
  //             console.log(code);
  //             response.redirect("/")
  //         }
  //     })
  //     .catch((error) => {
  //         console.error(error)
  //     })
});
///faculty_assignment
app.post("/faculty_assignment", function (req, res) {
  var file = req.files.uploaded_image;
  var img_name = file.name;
  var class_name = req.body.deptclass;
  console.log(class_name);
  var cid = Math.ceil(Math.random() * 100);
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("uploads/" + file.name, function (err) {
      if (err) {
        return res.status(500).send(err);
      } else {
        var mailOptions = {
          from: "help.sms2020@gmail.com", //"Example Team" <from@example.com>
          to:
            "rmb1@somaiya.edu, vrushil.g@somaiya.edu, khwajaavais.l@somaiya.edu", //thankyou khwaja
          subject: "Assignment",
          html: `Hey ${class_name}, here is the text that will represent details of Assignment`,
          attachments: [
            {
              filename: img_name,
              path: __dirname + "/uploads/" + img_name,
              cid: cid + img_name,
            },
          ],
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          } else {
            console.log("Message sent: %s", info.messageId);
          }
        });
      }
    });
    // res.sendFile(__dirname + "/index");
  } else {
    message =
      "This format is not allowed , please upload file with '.png','.gif','.jpg'";
  }
  res.render("faculty");
});
// Announcement
app.post("/faculty_redirect", function (req, res) {
  var sender_name = req.body.s_name;
  var dept_announce = req.body.dept_announce;
  var announce_description = req.body.announce_description;
  console.log(sender_name);
  console.log(dept_announce);
  console.log(announce_description);
  apiCallForPost(baseURLAPI, "notifications/", {
    name: sender_name,
    class: dept_announce,
    description: announce_description,
  }).catch((error) => {
    console.error("Error:", error);
  });
  res.render("faculty");
});

// Admin faculty Add
app.post("/add_faculty_redirect", function (req, res) {
  var faculty_id = req.body.faculty_id;
  var faculty_name = req.body.faculty_name;
  var email_id = req.body.email_id;
  var department = req.body.department;
  console.log(faculty_id);
  console.log(faculty_name);
  console.log(email_id);
  console.log(department);

  apiCallFunction(baseURLAPI, "faculties/", {
    f_id: faculty_id,
    faculty_name: faculty_name,
    email_id: email_id,
    department: department,
  }).catch((error) => {
    console.error("Error:", error);
  });

  res.redirect("./admin_faculty");
  // res.render("./admin_panel/admin_faculty");
});

// Admin Students Add
app.post("/add_student_redirect", function (req, res) {
  // var student_id = req.body.s_id;
  var first_name = req.body.fname;
  var last_name = req.body.lname;
  var roll_no = req.body.roll_no;
  var class_id = req.body.class_id;
  var department = req.body.department;
  var semester = req.body.semester;
  var address = req.body.address;
  var email_id = req.body.email_id;

  // console.log(student_id);
  console.log(first_name);
  console.log(last_name);
  console.log(roll_no);
  console.log(class_id);
  console.log(department);
  console.log(semester);
  console.log(address);
  console.log(email_id);
  apiCallFunction(baseURLAPI, "students/", {
    fname: first_name,
    lname: last_name,
    roll_no: roll_no,
    class_id: class_id,
    department: department,
    semester: semester,
    address: address,
    email_id: email_id,
  }).catch((error) => {
    console.error("Error:", error);
  });
  res.redirect("./admin_student");
});

// Admin Course Add
app.post("/add_course_redirect", function (req, res) {
  var course_id = req.body.course_id;
  var course_name = req.body.course_name;
  var faculty_name = req.body.faculty_name;
  var department = req.body.department;

  console.log(course_name);
  console.log(faculty_name);
  console.log(department);

  apiCallFunction(baseURLAPI, "courses/", {
    c_id: course_id,
    course_name: course_name,
    faculty_name: faculty_name,
    department: department,
  }).catch((error) => {
    console.error("Error:", error);
  });
  res.redirect("./admin_course");
});

// Admin Department Add
app.post("/add_department_redirect", function (req, res) {
  var department_id = req.body.department_id;
  var department_name = req.body.department_name;
  var hod = req.body.hod;

  console.log(department_id);
  console.log(department_name);
  console.log(hod);

  apiCallFunction(
    "https://stark-fortress-47961.herokuapp.com/",
    "departments/",
    {
      d_id: department_id,
      department: department_name,
      hod: hod,
    }
  ).catch((error) => {
    console.error("Error:", error);
    alert(error);
  });
  res.redirect("./admin_department");
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
const port = process.env.PORT || 4000;
const host = "0.0.0.0";
//mysql://b3ca7cfe40e6b8:a3089ee9@us-cdbr-iron-east-05.cleardb.net/heroku_cfe13983b5ea503?reconnect=true

app.listen(port, host, function () {
  console.log("Server started on " + port + "...");
});
