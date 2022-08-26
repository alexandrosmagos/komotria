var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

let titleD = "Demos";
let h1D = "Demos";

// index page
app.get('/', function(req, res) {
  res.render('pages/index', {title: titleD, h1: h1D});
});

const port = 3000;
app.listen(port);
console.log(`Server is listening on port ${port}`);