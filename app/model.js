
//Data model for Backend-Services  ---------------
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var XLSX = require('xlsx');

// Create Mongoose schemas
var DeporteSchema = new mongoose.Schema({ 
  	idDeporte: { type: String, required: true },
	cdDeporte: { type: Number, required: true },
	dsDeporte: { type: String, required: true },
	numJugadores: { type: Number, required: true }
});

var EventoDeportivoSchema = new mongoose.Schema({ 
  	idEvDep: { type: String, required: true },
	cdEvDep: { type: Number, required: true },
	cdDeporte: { type: String, required: false },
	lugar: { type: String, required: false },
	fecha: { type: Date, required: false },
	hora: { type: Date, required: false },
	usuarios: { type: ObjectId, required: false, ref: 'usuarios'}
});

var PerfilesSchema = new mongoose.Schema({ 
  	idPerfil: { type: String, required: true },
	cdPerfil: { type: Number, required: true },
	dsPerfil: { type: String, required: true }
});

var UsuariosSchema = new mongoose.Schema({ 
  	idUsuario: { type: String, required: true },
	cdUsuario: { type: Number, required: true },
	nombre: { type: String, required: false },
	apellido1: { type: String, required: false },
	apellido2: { type: String, required: false },
	apodo: { type: String, required: false },
	cdPerfil: { type: Number, required: true }
});


//Internal setting -----
var ConfigSchemaInternal = new mongoose.Schema({ 
  key: { type: String, required: true },
  value: { type: String, required: false }
});


//Create full text indexes (experimental)--- 
/*
    DeporteSchema.index({
    	idDeporte: 'text',
		dsDeporte: 'text'    
    });
    EventoDeportivoSchema.index({
    	idEvDep: 'text',
		cdDeporte: 'text',
		lugar: 'text',
		usuarios: 'text'    
    });
    PerfilesSchema.index({
    	idPerfil: 'text',
		dsPerfil: 'text'    
    });
    UsuariosSchema.index({
    	idUsuario: 'text',
		nombre: 'text',
		apellido1: 'text',
		apellido2: 'text',
		apodo: 'text'    
    });
*/


// Sample to inject operations into mongoose schemas
//DeporteSchema.pre('save', function (next) {
//  console.log('A Deporte was saved to MongoDB: %s.', this.get('idDeporte'));
//  next();
//});
//EventoDeportivoSchema.pre('save', function (next) {
//  console.log('A EventoDeportivo was saved to MongoDB: %s.', this.get('idEvDep'));
//  next();
//});
//PerfilesSchema.pre('save', function (next) {
//  console.log('A Perfiles was saved to MongoDB: %s.', this.get('idPerfil'));
//  next();
//});
//UsuariosSchema.pre('save', function (next) {
//  console.log('A Usuarios was saved to MongoDB: %s.', this.get('idUsuario'));
//  next();
//});

function buildModelForSchema(container, entityName, pluralName, schema) {
  var entityModel = mongoose.model(entityName, schema);
  entityModel.plural(pluralName);

  container[entityName] = {
    'name': entityName,
    'plural': pluralName,
    'schema': schema, 
    'model': entityModel
  };
}


var propertiesForClass = {
	"deporte" : ['idDeporte', 'cdDeporte', 'dsDeporte', 'numJugadores'],
	"eventoDeportivo" : ['idEvDep', 'cdEvDep', 'cdDeporte', 'lugar', 'fecha', 'hora', 'usuarios'],
	"perfiles" : ['idPerfil', 'cdPerfil', 'dsPerfil'],
	"usuarios" : ['idUsuario', 'cdUsuario', 'nombre', 'apellido1', 'apellido2', 'apodo', 'cdPerfil']  
};




function getModelForClass(className) {
  if ('deporte'==className) {
    return DeporteModel;
  }
  if ('eventoDeportivo'==className) {
    return EventoDeportivoModel;
  }
  if ('perfiles'==className) {
    return PerfilesModel;
  }
  if ('usuarios'==className) {
    return UsuariosModel;
  }
  
  return null;
}

var ConfigModelInternal = mongoose.model('_config', ConfigSchemaInternal);  


function getCsvHeader(className) {
  var res="_id"; prefix=",";
  var props = propertiesForClass[className];
  if (props) {
    for(var index in props) {
      res += prefix + csvEncode(props[index]);
    }
    return res+"\r\n";
  }
  return null;
}
function toCsv(objects, className) {
  var res = 'sep=,\r\n' + getCsvHeader(className);
  var props = propertiesForClass[className];
  if (props) {
    for(var j in objects) {
      var item = objects[j];
      res += item._id;
      var prefix = ",";
      for(var index in props) {
        res += prefix + csvEncode(item[props[index]]);
      }
      res +="\r\n";
    }
  }
  return res;
}
function isObjectId(obj) {
  return (typeof obj === 'object' && obj._bsontype === 'ObjectID');
}
function csvEncode(data) {
  var text;
  if (data == null) {
    return '';
  }
  if (isObjectId(data)) {
    return data.toString();
  }
  text = data.toString();
  
  if ((text.indexOf(',') >= 0) || (text.indexOf('.') >= 0) || (text.indexOf(' ') >= 0)) {
    return '"' + text + '"';
  }   
  return text;
}

function toXml(objects, className) {
  var res = '<?xml version="1.0" encoding="UTF-8"?>\r\n<data>\r\n';
  var props = propertiesForClass[className];
  if (props) {
    for(var j in objects) {
      var item = objects[j];
      res += '  <' + className + '><id>' + item._id + '</id>';
      for(var index in props) {
        var prop = props[index];
        res += '<'+ prop + '>' + xmlEncode(item[prop]) + '</' + prop + '>';
      }
      res +='</' + className + '>\r\n';
    }
  }
  return res + "</data>\r\n";
}
function xmlEncode(data) {
  if (data == null) {
    return '';
  }
  var res = data.toString().replace(/&/g, '&amp;')
                .replace(/'/g, '&apos;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
  ;
  return res;
}

function toXlsx(objects, className) {
  var ws_name = className;
  var wb = {
    SheetNames: [],
    Sheets: {}
  };

  var properties = propertiesForClass[className];

  var data = [];
  //add labels
  var headers = [ "_id" ];
  for(var z in properties) {
    headers.push(properties[z]);
  }
  data.push(headers);

  for(var i in objects) {
    var row = objects[i];
    var rowItem = [ row._id ];

    for(var key in properties) {
      var value = row[properties[key]];
      rowItem.push(value);
    }
    data.push(rowItem);
  }
  
  var ws = sheetFromArrayOfArrays(data);
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbbuf = XLSX.write(wb, { type: 'buffer' });
  return wbbuf;
} 
 
function sheetFromArrayOfArrays(data, opts) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  for(var R = 0; R != data.length; ++R) {
    for(var C = 0; C != data[R].length; ++C) {
      if(range.s.r > R) { range.s.r = R; }
      if(range.s.c > C) { range.s.c = C; }
      if(range.e.r < R) { range.e.r = R; }
      if(range.e.c < C) { range.e.c = C; }
      var cell = {v: data[R][C] };
      if(cell.v == null) { continue; }
      var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
      
      if(typeof cell.v === 'number') { cell.t = 'n'; }
      else if(typeof cell.v === 'boolean') { cell.t = 'b'; }
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else {
        cell.t = 's';
      }      
      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range);
  }
  return ws;
}

function datenum(v, date1904) {
  if(date1904) {
    v+=1462;
  }
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}


module.exports.ConfigModelInternal    = ConfigModelInternal;

module.exports.getModelForClass = getModelForClass;
module.exports.toCsv = toCsv;
module.exports.toXlsx = toXlsx;
module.exports.toXml = toXml;


var models = {};

//Models ----

buildModelForSchema(models, 'deporte', 'deportes', DeporteSchema);
buildModelForSchema(models, 'eventoDeportivo', 'eventosDeportivos', EventoDeportivoSchema);
buildModelForSchema(models, 'perfiles', 'perfiles', PerfilesSchema);
buildModelForSchema(models, 'usuarios', 'usuarios', UsuariosSchema);


// Register the schema and export it
module.exports.models         = models;
module.exports.getModelForClass   = getModelForClass;
module.exports.propertiesForClass   = propertiesForClass;
