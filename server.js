// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var people = require('./routes/people');
 
 // Express
var app = express();
app.use(express.static('public'));
 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
 
app.get('/people', people.findAll);
app.post('/people', people.addPerson);
 
 // Start server
app.listen(3000);
console.log('Listening on port 3000...');