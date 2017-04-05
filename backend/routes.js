// WRONGGG
function stupid (app) {
  app.get('/stupid', function (req, res) {
    res.send('you stupid');
  });
}

function root (app) {
  app.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });
  });
}

function item (app, connection) {
  app.get('/item', function(req, res) {
      connection.query('select * from item', function (error, results, fields) {
          if (error) throw error;
          console.log(error, results, fields);
          res.json(results);
      });
  });
}

// RIGHT!!!
module.exports = {
  setRoutes: function(app, connection) {
    stupid(app);
    root(app);
    item(app, connection);
  }
}
