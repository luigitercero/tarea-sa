const express = require('express');
var mysql = require('mysql');
const port = 3000;
const app = express();
app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});

app.get('/', function (req, res) {
  res.send('<h1>Hello World2!</h1>'
  + "<a href=\"/d\">"+"download"+"</a>"
  
  )
})

app.get('/d', function (req, res) {
 res.sendFile(__dirname+"/repo.zip");
})

app.get('/download',function(req,res){
  var str = process.env.REPO;
  var ress = str.split(".git");
  console.log(ress[0]+"/archive/master.zip");
  res.send('<h1>Hello World!</h1><a href=\"'+ress[0]+"/archive/master.zip\">Download zip</a>");
})

