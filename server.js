
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

var routes = require('./backend/routes.js');
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

routes.setRoutes(app, connection);

app.listen(9090);
