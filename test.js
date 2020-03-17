//var multer  =   require('multer');

// var storage =   multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//       callback(null, file.fieldname + '-' + Date.now());
//     }
//   });
// var upload = multer({ storage : storage}).single('userPhoto');
  
// var http = require('http');
// var formidable = require('formidable');
// var fs = require('fs');

<form id        =  "uploadForm"
enctype   =  "multipart/form-data"
action    =  "/api/photo"
method    =  "post">
<select name="deptclass">
<option value="becomp">BE Comps</option>
<option value="beit">BE IT</option>
<option value="beextc">BE EXTC</option>
<option value="beetrx">BE ETRX</option>
</select><br><br>
<input type="file" id="myFile" name="userPhoto">
<input type="submit"value="Upload Image" name="submit">
</form>

<div class="content">
    <h1 class="header" align="center">Notifications</h1>
    <marquee behavior="scroll" direction="up" scrollamount="2"
      onmouseout="this.setAttribute('scrollamount', 2, 0); this.start()"
      onmouseover="this.setAttribute('scrollamount', 0, 0); this.stop()" class="moving-body">
      <script>
        for (var i = 0; i <= 5; i++) {
          document.write('<p class="m-par">' + i + 'Moving element : </p>')
        }
      </script>

      <!-- <script>
        $(function () {

          $("button").on("click", function () {
            $.ajax({
              type: 'GET',
              url: 'https://infinite-garden-28674.herokuapp.com/notifications',
              success: function (result) {
                $('#champ').html(result);
                //alert(result);
              }
            });

          })

        });
      </script> -->
    </marquee>
  </div>
  <% for (var i = 0; i< order.length; i++) { %>
  <div id="champ">
    <!-- <span><%= order[i].name %></span> -->
    <span><%= order[i].class %></span>
    <span><%= order[i].description %></span>
  </div>
  <% } %></input>

<script>
        $(function () {

          $("button").on("click", function () {
            $.ajax({
              type: 'GET',
              url: 'https://infinite-garden-28674.herokuapp.com/notifications',
              success: function (result) {
                $('#champ').html(result);
                //alert(result);
                for (var i = 0; i <= result.length; i++) {
                  document.write('<p class="m-par">' + result[i].description + 'Moving element : </p>')
                  // for (var i = 0; i <= 5; i++) {
                  //   document.write('<p class="m-par">' + i + 'Moving element : </p>')
                  // }
                }
              }
            });

          })

        });
      </script>
      <button>Press</button>