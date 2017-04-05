const manager = require('simple-node-logger').createLogManager();
const log = manager.createLogger('item');
log.setLevel('debug');
var db = require('../db.js');
var connection = db.get();

var getItems = function (req) {
  db.connection.query('select * from item', function (error, results, fields) {
      if (error) throw error;
      log.debug(error, results, fields);
      return results;
  });
}

module.exports = {
  getItems: function(req, res) {
    var queryResults = "";

    connection.query('select * from item', function (error, results, fields) {
        if (error) {
          log.error(error);
          throw error;
        }

        log.debug(results);
        log.debug(fields);
        res.json(fields);
    });
  }
}
