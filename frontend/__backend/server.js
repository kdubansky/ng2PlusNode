// Generic Module Includes
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// POC API Modules + Settings
var fs = require('fs'),
    glob = require('glob'),
    rootFlatJsonDir = __dirname + '/api_json/',
    rootFlatImageDir = rootFlatJsonDir + '__image_',
    rootFlatDomainDir = __dirname + '/api_json_domain/';

// Server Settings
var passwordEnabled = false,
	 mainProxyToUrl = '',
	 logExecTimes = true,
	 port = 4201;

// Get server settings, as stored in the POC API
console.log('\n\n SERVER STARTED \n\n\n');
var serverSettings = getObject('__system_node_server_settings', 1);
if(!serverSettings) {
	console.warn('\n\n *** SERVER SETTINGS NOT FOUND ***\n\n\n');
	console.warn(serverSettings);
} else {
	passwordEnabled = serverSettings.basicAuthEnabled;
	mainProxyToUrl = serverSettings.apiUrl;
	logExecTimes = serverSettings.logExecTimes;
	console.info('Found good server settings.');
	console.info('passwordEnabled: ', passwordEnabled);
	console.info('mainProxyToUrl: ', mainProxyToUrl);
	console.info('\n\n\n');
}

if (passwordEnabled) {
	var auth = require("http-auth"); // Re-enabled for authentication
	var basic = auth.basic({ // Re-enable for authentication
		realm: "Demo Area.",
		file: __dirname + "/htpasswd" // Coffeecup:Coffeecup1
	});
	app.use(auth.connect(basic)); //hook http auth into express // Re-enable for basic authentication
}

var execTimeLogFile = 'api_json/__log_proxy_execution_times.csv';

// -----------------------------------------------------------------------------
// Proxies ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
// You must proxy the request before body-parser is employed - it creates a 
// buffer that destroys the flow of the POST request (creates a time out)
var fs = require('fs'),
	 httpProxy = require('http-proxy'), 
	 apiProxy = httpProxy.createProxyServer();
app.all('/*', function(req, res, next) {
	var thisFile = String(__dirname + '/dist' + req.url).split('?')[0],
		 prefix = req.url + ': '; 
	// if(req.url === '/' || fs.existsSync(thisFile)) {
	// 	console.log(prefix + 'File exists, serving it...');
	// 	next('route');
	// } else {
	if(req.url.indexOf('/flat/') === 0) {
		console.log('Flat request...');
		next('route');
	} else {
		console.log(prefix + 'File does *not* exist. Proxying request...');
		var start = new Date(),
			 realEnd = res.end;
		if(logExecTimes) {
			res.end = function() {
			 	var end = new Date(),
			 		 timeElapsed = end.getTime() - start.getTime();
		 		fs.appendFile(execTimeLogFile, 
		 			end.getTime() + '|' + 
		 			req.url + '|' + 
		 			res.statusCode + '|' + 
		 			timeElapsed + '\n');
		 		console.info(prefix + 'Request completed in ' + timeElapsed + ' milliseconds (' + res.statusCode + ')');
			 	realEnd.apply(res);
			};
		}
		apiProxy.web(req, res, { target: mainProxyToUrl }, function(error) {
			console.warn(prefix + 'Proxy failed with the following error object:');
			console.warn(error);
		});
	}
	//apiProxy.web(req, res, { target: mainProxyToUrl });
});

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  next();
});

app.use(express.static(__dirname + "/dist/"));
app.use(bodyParser.json());

// -----------------------------------------------------------------------------
// REST APIs that bring back domain data ---------------------------------------
// -----------------------------------------------------------------------------

app.get('/flat/domain', function(req, res) {
	// Get all domain resources available
	var domainsList = getObjects(null, 'domain');
	domainsList.unshift({ // Push a real API result here for testing
		"name": "CORPSTRUC (Via ProvAppCLService)",
		"href": "reference/data/CORPSTRUC"
	});
	res.json(domainsList);
});
app.get('/flat/domain/:domainType', function(req, res) {
	// Grab a specific domain resource (already returned as an array - or it should be)
	res.json(getObject(req.params.domainType, null, 'domain'));
});

// -----------------------------------------------------------------------------
// REST APIs that connect to flat JSON files -----------------------------------
// -----------------------------------------------------------------------------

function getObjects(objectType, superType) {
	var globPath = null;
	switch(superType) {
		case 'image':
			break;
		case 'domain':
			// Grab all JSON files in the (in source control) domain resource directory
			// objectType isn't there
			globPath = rootFlatDomainDir + '*.json';
			break;
		default:
			globPath = rootFlatJsonDir + objectType + '_*' + '.json';
			break;
	}
	console.log('GET ' + globPath);
	var matchedObjects = glob.sync(globPath),
		 thisObjectId = null,
		 thisObject = null,
		 thisDomainResource = null,
		 resourceName = null,
		 returnObjects = [];
	for(var i = 0; i < matchedObjects.length; i++) {
		if(superType) {
			resourceName = matchedObjects[i].match(/([A-Za-z0-9_]+)\.json$/);
			// Horribly inefficient - but these domain files should be very small
			// (Do not place 20K+ line files here!)
			thisDomainResource = getObject(resourceName[1], null, superType);
			console.log(thisDomainResource.name);
			returnObjects.push({
				name: thisDomainResource.name,
				href: 'LOC::' + 'domain/' + resourceName[1]
			});
		} else if(thisObjectId) {
			thisObjectId = matchedObjects[i].match(/([0-9]+)\.json$/);
			thisObject = getObject(objectType, thisObjectId[1]);
			if(!thisObject.deleted) {
				returnObjects.push(thisObject);
			}
		}
	}
	return returnObjects;
}
function getObject(objectType, objectId, superType) {
	var parsedJSON = null,
		 filePath = null,
		 hateoasHref = null;
	switch(superType) {
		case 'image':
			filePath = rootFlatImageDir + objectType + '_' + objectId + '.json';
			break;
		case 'domain':
			// There is no ID here
			filePath = rootFlatDomainDir + objectType + '.json';
			break;
		default:
			filePath = rootFlatJsonDir + objectType + '_' + objectId + '.json';
			break;
	}
	console.log('GET ' + filePath + ' (type: ' + superType + ')');
	try {
		parsedJSON = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		switch(superType) {
			case 'image':
				hateoasHref = 'flat/image/' + objectType + '_' + parsedJSON.id;
				break;
			case 'domain':
				break;
			default:
				hateoasHref = 'flat/' + objectType + '/' + parsedJSON.id;
				break;
		}
		parsedJSON._links = [ // Add HATEOAS support for each object (we never nest, so this is OK)
			{
				rel: parsedJSON.id,
				href: hateoasHref,
				methods: ['GET', 'POST', 'PUT', 'DELETE']
			}
		];
	} catch(error) {
		console.warn('Object not found on file system. Error: ');
		console.warn(error);
	}
	return parsedJSON;
}
function putObject(objectType, object, forceWrite) {
	if(forceWrite) {
		// Force the object to be written to the disk
		if(!object.id) {
			console.warn('Cannot write an object to the file system without an ID!');
			return false;
		}
		fs.writeFileSync(rootFlatJsonDir + objectType + '_' + object.id + '.json', JSON.stringify(object));
	} else {
		// Update or new
		console.log('POST/PUT ' + rootFlatJsonDir + objectType + '_' + object.id + '.json');
		if(!object.id) { // New object
			object.id = newId();
		}
		if(!object.deleted) {
			object.deleted = false;
		}
		fs.writeFileSync(rootFlatJsonDir + objectType + '_' + object.id + '.json', JSON.stringify(object));
	}
	return getObject(objectType, object.id);
}
function deleteObject(objectType, objectId) {
	// Delete the file (or mark the record as inactive using a flag in the JSON)
	console.log('DELETE ' + rootFlatJsonDir + objectType + '_' + objectId + '.json');
	var object = getObject(objectType, objectId);
	object.deleted = true;
	putObject(objectType, object);
	return true;
}
function newId() {
	var now = new Date();
	return now.getTime() + '' + parseInt((now.getTime() / 2) * Math.random());
}


// Generic GETs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/flat/:objectType', function(req, res) {
	res.json(getObjects(req.params.objectType));
});
app.get('/flat/:objectType/:objectId', function(req, res) {
	res.json([
		getObject(req.params.objectType, req.params.objectId)
	]);
});

// Generic DELETEs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.delete('/flat/:objectType/:objectId', function(req, res) {
	res.json(deleteObject(req.params.objectType, req.params.objectId));
});

// Generic UPSERTs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function upsert(req, res) {
	var object = req.body;
	if(req.params.objectId) {
		// There's an ID. Place it in the object if it's not there
		if(!object.id) {
			object.id = req.params.objectId;
		}
	}
	res.json(putObject(req.params.objectType, object));	
}
app.put('/flat/:objectType', function(req, res) {
	upsert(req, res);
});
app.put('/flat/:objectType/:objectId', function(req, res) {
	upsert(req, res);
});
app.post('/flat/:objectType', function(req, res) {
	console.log(req);
	upsert(req, res);
});
app.post('/flat/:objectType/:objectId', function(req, res) {
	upsert(req, res);
});

app.listen(port);
console.log("Server running on port " + port);
console.log("directory: " + __dirname);