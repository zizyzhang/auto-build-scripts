var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var exec = require('child_process').exec;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/push', function (req, res) {
  console.log(req.get('X-GitHub-Event'))
  if(req.get('X-GitHub-Event')=='push'){
   exec("sh ~/git/auto-build/auto-build.sh",
   function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
   }); 
  }
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
