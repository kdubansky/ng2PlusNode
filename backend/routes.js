const manager = require('simple-node-logger').createLogManager();
const log = manager.createLogger('routes');
log.setLevel('debug');

var itemController = require('./controllers/item.js');

var stupid = function (req, res) {
  res.json("you stupid");
}

var hey = function (req, res) {
  res.json("sup");
}

var root = function (req, res) {
  res.json("{ message: 'hooray! welcome to our api!' }");
}

/**
* app   = app that is passed into setRoutes
* path  = API path
* route = actual function to be executed
*/
function get(app, path, route) {
  app.get(path, function(req, res) {
    log.info("calling " + path);
    route(req, res);
  });
}

module.exports = {
  setRoutes: function(app) {
    log.info("building api")
    get(app, '/stupid', stupid);
    get(app, '/hey', hey);
    get(app, '/', root);
    get(app, '/items', itemController.getItems);
    //item(app, connection);
  }
}
