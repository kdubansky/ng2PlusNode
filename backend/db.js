var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'UserPassword',
  database : 'hackathon'
});

module.exports = {
  get: function() {
    return connection;
  }
}
