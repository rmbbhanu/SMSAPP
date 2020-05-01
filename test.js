// //var multer  =   require('multer');

// // var storage =   multer.diskStorage({
// //     destination: function (req, file, callback) {
// //       callback(null, './uploads');
// //     },
// //     filename: function (req, file, callback) {
// //       callback(null, file.fieldname + '-' + Date.now());
// //     }
// //   });
// // var upload = multer({ storage : storage}).single('userPhoto');
  
// // var http = require('http');
// // var formidable = require('formidable');
// // var fs = require('fs');

// <form id        =  "uploadForm"
// enctype   =  "multipart/form-data"
// action    =  "/api/photo"
// method    =  "post">
// <select name="deptclass">
// <option value="becomp">BE Comps</option>
// <option value="beit">BE IT</option>
// <option value="beextc">BE EXTC</option>
// <option value="beetrx">BE ETRX</option>
// </select><br><br>
// <input type="file" id="myFile" name="userPhoto">
// <input type="submit"value="Upload Image" name="submit">
// </form>

// <div class="content">
//     <h1 class="header" align="center">Notifications</h1>
//     <marquee behavior="scroll" direction="up" scrollamount="2"
//       onmouseout="this.setAttribute('scrollamount', 2, 0); this.start()"
//       onmouseover="this.setAttribute('scrollamount', 0, 0); this.stop()" class="moving-body">
//       <script>
//         for (var i = 0; i <= 5; i++) {
//           document.write('<p class="m-par">' + i + 'Moving element : </p>')
//         }
//       </script>

//       <!-- <script>
//         $(function () {

//           $("button").on("click", function () {
//             $.ajax({
//               type: 'GET',
//               url: 'https://infinite-garden-28674.herokuapp.com/notifications',
//               success: function (result) {
//                 $('#champ').html(result);
//                 //alert(result);
//               }
//             });

//           })

//         });
//       </script> -->
//     </marquee>
//   </div>
//   <% for (var i = 0; i< order.length; i++) { %>
//   <div id="champ">
//     <!-- <span><%= order[i].name %></span> -->
//     <span><%= order[i].class %></span>
//     <span><%= order[i].description %></span>
//   </div>
//   <% } %></input>

// <script>
//         $(function () {

//           $("button").on("click", function () {
//             $.ajax({
//               type: 'GET',
//               url: 'https://infinite-garden-28674.herokuapp.com/notifications',
//               success: function (result) {
//                 $('#champ').html(result);
//                 //alert(result);
//                 for (var i = 0; i <= result.length; i++) {
//                   document.write('<p class="m-par">' + result[i].description + 'Moving element : </p>')
//                   // for (var i = 0; i <= 5; i++) {
//                   //   document.write('<p class="m-par">' + i + 'Moving element : </p>')
//                   // }
//                 }
//               }
//             });

//           })

//         });
//       </script>
//       <button>Press</button>
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues



// 'use strict';
// const axios = require('axios');
// const functions = require('firebase-functions');
// const {
//     WebhookClient
// } = require('dialogflow-fulfillment');
// const {
//     Card,
//     Suggestion
// } = require('dialogflow-fulfillment');

// process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

// exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
//     const agent = new WebhookClient({
//         request,
//         response
//     });
//     console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
//     console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

//     function welcome(agent) {
//         agent.add(`Welcome to my agent!`);
//     }

//     function fallback(agent) {
//         agent.add(`I didn't understand`);
//         agent.add(`I'm sorry, can you try again?`);
//     }

//     function studentHandler(agent) {
//         const s_name = agent.parameters.student;
//         //agent.add(`Here is the data for ${s_name}`);
//         return axios.get(`https://stark-fortress-47961.herokuapp.com//students/name/${s_name}`)
//             .then((rows) => {
//                 //console.log(rows.data);
//                 rows.data.map(wordObj => {
//                     console.log(wordObj.fname);
//                     agent.add(`Here is the data for ${s_name} <br/>
// 				First Name:` + wordObj.fname + ` <br/>
// 				Last Name:` + wordObj.lname + ` <br/>
// 				Department:` + wordObj.department + ` <br/>
// 				Email id:` + wordObj.email_id);
//                 });
//             });
//     }
//   //facultyHandler
//       function facultyHandler(agent) {
//         const faculty_name = agent.parameters.faculty_name;
//         //agent.add(`Here is the data for ${s_name}`);
//         return axios.get(`https://stark-fortress-47961.herokuapp.com/faculties/${faculty_name}`)
//             .then((rows) => {
//                 //console.log(rows.data);
//                 rows.data.map(wordObj => {
//                     console.log(wordObj.fname);
//                     agent.add(`Here is the data for ${faculty_name} <br/>  
// 				Name:` + wordObj.faculty_name + ` <br/>
// 				Department:` + wordObj.department + ` <br/>
// 				Email id:` + wordObj.email_id);
//                 });
//             });
//     }
//     // course Handler
//     function courseHandler(agent) {
//         const subject = agent.parameters.subject;
//         //agent.add(`Here is the data for ${s_name}`);
//         return axios.get(`https://stark-fortress-47961.herokuapp.com/courses/${subject}`)
//             .then((rows) => {
//                 //console.log(rows.data);
//                 rows.data.map(wordObj => {
//                     console.log(wordObj.fname);
//                     agent.add(`Here is the data for ${subject} <br/>
// 				Faculty Name:` + wordObj.faculty_name + ` <br/>	
// 				Department:` + wordObj.department);
//                 });
//             });
//     }
//     // Department Handler
//     function departmentHandler(agent) {
//         const dept = agent.parameters.dept;
//         //agent.add(`Here is the data for ${s_name}`);
//         return axios.get(`https://stark-fortress-47961.herokuapp.com/departments/${dept}`)
//             .then((rows) => {
//                 //console.log(rows.data);
//                 rows.data.map(wordObj => {
//                     console.log(wordObj.fname);
//                     agent.add(`Here is the data for ${dept} <br/>
// 				Faculty Name:` + wordObj.hod + ` <br/>
// 				Department:` + wordObj.department);
//                 });
//             });
//     }
//     //attendance Handler
//     function attendanceHandler(agent) {
//         let course_name = agent.parameters.course_name;
//         let class_name = agent.parameters.class_name;
//         console.log(course_name,class_name);
//         let ctx = {
//             'name': 'params2',
//             'lifespan': 10,
//             'parameters': {
//               'course_name': course_name,
//               'class_name': class_name
//             }
//           };
//           agent.setContext(ctx);
//           console.log(ctx);

        
//     }
// //settingAttendanceHandler
//     function settingAttendanceHandler(agent){
//         let params2 = agent.getContext("params2").parameters;
//         let class_name = params2.class_name;
//         let course_name = params2.course_name;
//         console.log(params2);
//         let s_id = agent.parameters.s_id;
//         let status = agent.parameters.status;
//         console.log(s_id,status);

//         return axios.post('https://stark-fortress-47961.herokuapp.com/attendance', {
//                 course_name: course_name,
//                 class_name: class_name,
//                 s_id: s_id,
//                 status: status
//             })
//             .then((res) => {
//                 console.log(`statusCode: ${res.status}`);
//                 console.log(res.config);
//                 console.log(res.data);

//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
        


//     // Run the proper function handler based on the matched Dialogflow intent name
//     let intentMap = new Map();
//     intentMap.set('Default Welcome Intent', welcome);
//     intentMap.set('Default Fallback Intent', fallback);
//     intentMap.set('getStudent', studentHandler);
//     intentMap.set('getCourse', courseHandler);
//     intentMap.set('getDepartment', departmentHandler);
//     intentMap.set('setAttendance_class_course', attendanceHandler);
//     intentMap.set('setAttendance',settingAttendanceHandler);
//     intentMap.set('getFaculty',facultyHandler);


//     agent.handleRequest(intentMap);
// });