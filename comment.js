// Create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/comment', function(req, res){
    var comment = req.body.comment;
    console.log(comment);
    fs.appendFile('comment.txt', comment + '\n', function(err){
        if(err) throw err;
        console.log('Saved!');
    });
    res.send('Comment: ' + comment);
});

app.get('/comment', function(req, res){
    fs.readFile('comment.txt', 'utf8', function(err, data){
        if(err) throw err;
        res.send(data);
    });
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});

// Run the server: node comment.js
// Open browser and go to http://localhost:3000
// Enter a comment, and click on Submit
// Go to http://localhost:3000/comment to see the comments

// Use Postman to test the