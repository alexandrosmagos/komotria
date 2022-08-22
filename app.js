var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

const port = 3000;
app.listen(port);
console.log(`Server is listening on port ${port}`);