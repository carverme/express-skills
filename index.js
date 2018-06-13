var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/html/index.html');
});

app.get('/new', function(req, res) {
  res.sendFile(__dirname + '/static/html/new.html');
});

app.get('/skills', function(req, res) {
  var foo = fs.readFileSync('./data.json');
  somethingElse = JSON.parse(foo);
  res.render('skills', {skills: somethingElse});
});



app.get('/skills/:id', function(req, res) {
  var skills = fs.readFileSync('./data.json');
  skills = JSON.parse(skills);
  var skillIndex = req.params.id;
  if (skillIndex >= skills.length) {
    res.send("That isn't a skill!");
  } else {
    res.render('show', {skill: skills[skillIndex]})
  }
});

//this function sends the input to the webpage and displays it...

app.post('/skills', function(req, res) {
//read the data file
var skills = fs.readFileSync('./data.json');
//then turn it into an object(parse) and stores it in animals
skills = JSON.parse(skills);
//then add the new animal to the array (push) from the form
skills.push({name: req.body.name, level: req.body.level});
//write the object back to the file and stringify it to write it to data. json
fs.writeFileSync('./data.json', JSON.stringify(skills));
//redirect to the animals list page
res.redirect('/skills');

});







//TODO: render this array of skills into an ejs template.
//   res.send(skills);
// });

//TODO: Add get route that returns static page containing a form

//TODO: Add a post route that writes new skill to the file, redirects to skills index.

//TODO: create an EJS file for the form stuff..?
//TODO: Form should have action='/skills' and method= 'POST'

//TODO: send a slack to repo...


app.listen(process.env.PORT || 3000);
