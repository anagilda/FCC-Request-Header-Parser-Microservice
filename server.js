// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// If true, the client’s IP address is understood as the left-most entry in the X-Forwarded-* header.
app.set('trust proxy', true)

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoint... 
app.get("/api/whoami", function (req, res) {
  res.json({
              ipaddress: req.ip,
              language : req.header('accept-language'),
              software : req.header('user-agent')
           
           });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
