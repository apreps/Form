// Database
var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('peopleNewDatabase', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'peopledb' database");
        db.collection('people', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'people' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('people', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addPerson = function(req, res) {
    var wine = req.body;
    console.log('Adding new persons: ' + JSON.stringify(wine));
    db.collection('people', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

// Add some values to the database
var populateDB = function() {
 
    var people = [
    {
        name: "John Smith",
        address: "Some address here",
        occupation: "Student",
        bday: "1987-04-21"
    },
    {
        name: "Anna Rodriguez",
        address:"Some address here",
        occupation: "Lawyer",
        bday: "1990-07-14"
    }];
 
    db.collection('people', function(err, collection) {
        collection.insert(people, {safe:true}, function(err, result) {});
    });
 
};