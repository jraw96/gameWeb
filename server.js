// server.js

//Import modules:
var express = require('express')
var app = express()

var mongoose = require('mongoose') // Used for mongoDB
var bodyParser = require('body-parser') // Gets info from HTTP POST
var morgan = require('morgan') // Used for logging info; eg. to console. 
var methodOverride = require('method-override') // Simulate DELETE and PUT requests 
var mongojs = require('mongojs') // Driver for mongoDB API

// Bring in our models:
var gameTitle = require('./models/model.js')

// Port declaration:
var port = process.env.PORT || 8080;

// Connect to mongo database online: 
var db = mongojs('mongodb://jakeDev:jakedev@ds149201.mlab.com:49201/charadise')
//mongoose.connect('mongodb://jakeDev:jakedev@ds149201.mlab.com:49201/charadise')


//Standard basic shit. Copy/pasted.
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// ==== Routes =====

// Get all titles
app.get('/api/titles', function(req, res){
    //Use mongoose to find all gameTitles in the database. 
    db.gameLib.find(function(err, titles){
        if(err){console.log(err)}
        else{
            res.json(titles) // Return all the titles in json format. 
        }
    })
})

// Create a new game title, and send back all titles after. 
app.post('/api/titles', function(req,res){

    // Create a game title entry. The request comes from an AJAX call from the Angular front end, that will create a new field in the mongo db.  
    db.gameLib.save({
        title: req.body.title, // Text is the entry in the request here the title is saved in. 
        //dateAdded: req.body.dateAdded
    }, function(err, titles){
        if(err){res.send(err)}
        db.gameLib.find(function(err, titles){
            if(err){res.send(err)}
            else{
            res.json(titles)
            }
        })

    })     
})

// Create a new list in the data base
app.post('/api/list', function(req,res){
    db.myFiveLists.save({
        listTitle: req.body.listTitle,
        listEntries: req.body.listEntries
    }, function(err, data){
        if(err){res.send(err)}
        else{
            res.json(data)
        }
    })
})

// Be able to send a delete request 
app.delete('/api/titles/:title_id', function(req,res){ 
    console.log("Trying to delete: " + req.params.id)
    db.gameLib.remove({
        _id: mongojs.ObjectId(req.params.title_id)
    }, function(err, titles){

        if(err){res.send(err)}

        db.gameLib.find(function(err, titles){
        console.log("Tried to delete: " + req.params.id)

            if(err){res.send(err)}
            else{
            res.json(titles)
            }
        })

    })
})



// Route to direct to Angular front end:
app.get('*', function(req,res){
    res.sendFile('./public/index.html')
})

// Listen to app on port:
app.listen(8080)
console.log("Listening on port: " + port)

