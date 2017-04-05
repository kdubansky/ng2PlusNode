
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./backend/routes.js');
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

routes.setRoutes(app);

app.listen(9090);
