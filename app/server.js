// Services backend for SampleBackend
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by AppNow (http://appnow.radarconline.com) 
//     Code-gen engine version: 4.5.2.30102 
//     MEAN generator version:  0.3.0.2
//     at:                      3/10/2015 8:09:43 AM UTC
// </auto-generated>
//------------------------------------------------------------------------------

var S = require('string');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var baucis = require('baucis');
var swagger = require('baucis-swagger');
var path = require('path');

var models = require('./model');
var auth = require('./conf/auth');
var https = require("https");


//var S = require('string');
//var compression = require('compression');
//var path = require('path');

//var express = require('express');
//var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
//var morgan = require('morgan');
//var mongoose = require('mongoose');
//var baucis = require('baucis');
//var swagger = require('baucis-swagger');
//var models = require('./model');
//var auth = require('./conf/auth');

//var imp = require('./import');

var dbCnx = resolveMongoDbCnx();
mongoose.connect(dbCnx);


function resolveMongoDbCnx() {
  if (process.env.VCAP_SERVICES) {
    var vCap = JSON.parse(process.env.VCAP_SERVICES);

    if (vCap['mongodb-2.2']) {
      return vCap['mongodb-2.2'][0].credentials.url || 
             'mongodb://localhost:27017/DemoDb';
    }
    else{
      return vCap['mongodb-2.4'][0].credentials.url || 
             'mongodb://localhost:27017/DemoDb';
    }
  }
  return process.env.MONGOLAB_URI || 
         'mongodb://localhost:27017/DemoDb';
}

var csvSupport = require('./baucis-csv.js');
csvSupport.apply(baucis);



// Pluralize and set resources names
//models.DeporteModel.plural('deportes');
//models.EventoDeportivoModel.plural('eventoDeportivos');
//models.PerfilesModel.plural('perfiles');
//models.UsuariosModel.plural('usuarios');

// Create the API routes & controllers
var deporteController = baucis.rest('deporte', models.DeporteModel);
var eventoDeportivoController = baucis.rest('eventoDeportivo', models.EventoDeportivoModel);
var perfilesController = baucis.rest('perfiles', models.PerfilesModel);
var usuariosController = baucis.rest('usuarios', models.UsuariosModel);

//Add export functionality
deporteController.get('/download/csv', function(req, res, done){
  models.DeporteModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/csv')
       .attachment('deportes.csv')
       .send(models.toCsv(objects, 'deporte'))
       .end();  
    done();
  });
});
deporteController.get('/download/xlsx', function(req, res, done){
  models.DeporteModel.where().exec(function (err, objects) {
    res.status(200)
       .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
       .attachment('deportes.xlsx')
       .send(models.toXlsx(objects, 'deporte'))
       .end(); 
    done();
  });
});
deporteController.get('/download/xml/', function(req, res, done){
  models.DeporteModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/xml')
       .attachment('deportes.xml')
       .send(models.toXml(objects, 'deporte'))
       .end(); 
    done();
  });
});

eventoDeportivoController.get('/download/csv', function(req, res, done){
  models.EventoDeportivoModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/csv')
       .attachment('eventoDeportivos.csv')
       .send(models.toCsv(objects, 'eventoDeportivo'))
       .end();  
    done();
  });
});
eventoDeportivoController.get('/download/xlsx', function(req, res, done){
  models.EventoDeportivoModel.where().exec(function (err, objects) {
    res.status(200)
       .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
       .attachment('eventoDeportivos.xlsx')
       .send(models.toXlsx(objects, 'eventoDeportivo'))
       .end(); 
    done();
  });
});
eventoDeportivoController.get('/download/xml/', function(req, res, done){
  models.EventoDeportivoModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/xml')
       .attachment('eventoDeportivos.xml')
       .send(models.toXml(objects, 'eventoDeportivo'))
       .end(); 
    done();
  });
});

perfilesController.get('/download/csv', function(req, res, done){
  models.PerfilesModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/csv')
       .attachment('perfiles.csv')
       .send(models.toCsv(objects, 'perfiles'))
       .end();  
    done();
  });
});
perfilesController.get('/download/xlsx', function(req, res, done){
  models.PerfilesModel.where().exec(function (err, objects) {
    res.status(200)
       .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
       .attachment('perfiles.xlsx')
       .send(models.toXlsx(objects, 'perfiles'))
       .end(); 
    done();
  });
});
perfilesController.get('/download/xml/', function(req, res, done){
  models.PerfilesModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/xml')
       .attachment('perfiles.xml')
       .send(models.toXml(objects, 'perfiles'))
       .end(); 
    done();
  });
});

usuariosController.get('/download/csv', function(req, res, done){
  models.UsuariosModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/csv')
       .attachment('usuarios.csv')
       .send(models.toCsv(objects, 'usuarios'))
       .end();  
    done();
  });
});
usuariosController.get('/download/xlsx', function(req, res, done){
  models.UsuariosModel.where().exec(function (err, objects) {
    res.status(200)
       .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
       .attachment('usuarios.xlsx')
       .send(models.toXlsx(objects, 'usuarios'))
       .end(); 
    done();
  });
});
usuariosController.get('/download/xml/', function(req, res, done){
  models.UsuariosModel.where().exec(function (err, objects) {
    res.status(200)
       .type('text/xml')
       .attachment('usuarios.xml')
       .send(models.toXml(objects, 'usuarios'))
       .end(); 
    done();
  });
});

// Create the express app 
var app = express();

//var swagger = new swagger(baucis);


//Configure app -------------------------------------
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
app.use(morgan('dev'));
app.use(compression({
    threshold: 512
}));  
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(cookieParser());
app.use(session({ 
    secret: auth.security.apiKey,
    resave: true,
    saveUninitialized: true
}));



//Simple Portal ApiKey based auth ------
app.post('/weblogin', function(req, res) {
	if (req.body.apikey == auth.security.apiKey) {
		res.cookie('apikey', req.body.apikey);
		res.status(200).send('{"id": 0, "user": {"id":0, "role": "admin"} }');
	}
	else {
		res.cookie('apikey', null);
		res.status(401).send('Unauthorized.');
	}
});

app.post('/webLogout', function(req, res) {
  res.clearCookie('apikey');
  res.status(200).send('OK');
});

app.post('/api/import', function(req, res) {
  return imp.importData(req, res);
});

//Add extra functionality
app.post('/api/delete', function(req,res){
  var className = req.body.className;
  var ids = req.body.ids;
  var model = models.getModelForClass(className);
  for(var index in ids) {
    var idItem = ids[index];
    model.findOneAndRemove( {'_id': idItem}, logError);
  }    
  res.status(200)
     .set('Content-Type', 'text/json')
     .send('');
});

function logError(err, doc) {
  if (doc) {
    // console.log('Deleted object: ' + doc);
  }
  if (err) {
    console.error(err);
  }
}

app.post('/api/deleteAll', function(req,res){
  try {
    var className = req.body.className;
    var model = models.getModelForClass(className);
    console.log("DeleteAll: " + req.body.conditions);
    var criteria = "";
    if (req.body.conditions != null && req.body.conditions !=="") {
      criteria = JSON.parse(req.body.conditions);
      model.remove(criteria).exec();
    } else {
      //delete all
      model.remove().exec();    
    }
        
    res.status(200)
       .set('Content-Type', 'text/json')
       .send('{}');
  }
  catch (e) {
    res.status(401)
       .set('Content-Type', 'text/json')
       .send('{ "error" : "Invalid query"}');
  }
});

//Error handler
app.use(function(err, req, res, next) {
  console.error(req.query);
  console.error(err.stack);
});


//CORS enabled for allowing 3rd party web-apps to consume Swagger metadata and backend. 
//Disable it commenting this block if you don not need it. ----------
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");  //Change * to your host domain
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
    next();
});


//Auth ----------
app.all('*', function(req, res, next) {
	if (req.url.substr(0,5) != '/api/'){
		return next();
	}
	return isLoggedIn(req, res, next);
});

function isLoggedIn(req, res, next) {
	var incomingKey = getHeaderOrParam(req, 'apikey');
	if (incomingKey == auth.security.apiKey){
		return next();
	}
	incomingKey = getHeaderOrParam(req, 'api_key');
	if (incomingKey == auth.security.apiKey){
		return next();
	}	
	res.status(401).send('Unathorized.');
}

function getHeaderOrParam(req, key){
	var cookie = req.cookies[key];
	if (cookie !== undefined) { 
    return cookie; 
  }
	var header = req.headers[key];
	if (header !== undefined) { 
    return header; 
  }
	return req.query[key];
}

var httpRootPath = __dirname + '/../public';

require('./services/eventoDeportivo').apply(models);
require('./import').apply(app);


app.use('/api', baucis());
app.use('/', express.static(httpRootPath));

var appPort = (process.env.VCAP_APP_PORT || process.env.PORT || 8000);
var appHost = (process.env.VCAP_APP_HOST || 'localhost');

app.listen(appPort);
//app.listen(appPort, appHost);

Object.keys(models.models).forEach(function(key) { 
    var resource = models.models[key];
    console.log('\tResource ' + S(resource.name).padRight(30) +' on   /api/' + resource.plural);
});

console.log('Sport Event App - Server listening on: '+ appHost + ':' + appPort );
console.log('\tResource Deporte                        on   /api/deportes');
console.log('\tResource EventoDeportivo                on   /api/eventoDeportivos');
console.log('\tResource Perfiles                       on   /api/perfiles');
console.log('\tResource Usuarios                       on   /api/usuarios');
console.log('\tSwagger docs                            on   /api/api-docs');
console.log('\tAngularJS admin web-client              on   /');
console.log('\tServing static www content from:             ' + httpRootPath);

