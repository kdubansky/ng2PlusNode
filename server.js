
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'UserPassword',
  database : 'hackathon'
});

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/item', function(req, res) {
    connection.query('select * from item', function (error, results, fields) {
        if (error) throw error;
        console.log(error, results, fields);
        res.json(results);
    });
});

app.listen(9090);