//Create test data for backend services
var mongoose = require('mongoose');

var models = require('./model');

var dbName = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/DemoDb';
mongoose.connect(dbName);


// Clear the database of old data
mongoose.model('deporte').remove(function (error) {
  if (error) {
  	throw error;
  }
});
mongoose.model('eventoDeportivo').remove(function (error) {
  if (error) {
  	throw error;
  }
});
mongoose.model('perfiles').remove(function (error) {
  if (error) {
  	throw error;
  }
});
mongoose.model('usuarios').remove(function (error) {
  if (error) {
  	throw error;
  }
});

console.log('Data deleted on: ' + dbName);

// Put the fresh data in the database
//Data for Deporte ---------------------------
console.log('  Creating data for  Deporte.');

mongoose.model('deporte').create( {
		idDeporte: 'IdDeporte0',
		cdDeporte: 10,
		dsDeporte: 'DsDeporte2',
		numJugadores: 30
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('deporte').create( {
		idDeporte: 'IdDeporte4',
		cdDeporte: 50,
		dsDeporte: 'DsDeporte6',
		numJugadores: 70
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('deporte').create( {
		idDeporte: 'IdDeporte8',
		cdDeporte: 90,
		dsDeporte: 'DsDeporte10',
		numJugadores: 110
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('deporte').create( {
		idDeporte: 'IdDeporte12',
		cdDeporte: 130,
		dsDeporte: 'DsDeporte14',
		numJugadores: 150
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('deporte').create( {
		idDeporte: 'IdDeporte16',
		cdDeporte: 170,
		dsDeporte: 'DsDeporte18',
		numJugadores: 190
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
//Data for EventoDeportivo ---------------------------
console.log('  Creating data for  EventoDeportivo.');

mongoose.model('eventoDeportivo').create( {
		idEvDep: 'IdEvDep20',
		cdEvDep: 210,
		cdDeporte: 'CdDeporte22',
		lugar: 'Lugar23',
		fecha: '2014.03.31',
		hora: '16:33:35Z+0200',
		usuarios: 'Usuarios26'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('eventoDeportivo').create( {
		idEvDep: 'IdEvDep27',
		cdEvDep: 280,
		cdDeporte: 'CdDeporte29',
		lugar: 'Lugar30',
		fecha: '2014.03.31',
		hora: '16:33:35Z+0200',
		usuarios: 'Usuarios33'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('eventoDeportivo').create( {
		idEvDep: 'IdEvDep34',
		cdEvDep: 350,
		cdDeporte: 'CdDeporte36',
		lugar: 'Lugar37',
		fecha: '2014.03.31',
		hora: '16:33:35Z+0200',
		usuarios: 'Usuarios40'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('eventoDeportivo').create( {
		idEvDep: 'IdEvDep41',
		cdEvDep: 420,
		cdDeporte: 'CdDeporte43',
		lugar: 'Lugar44',
		fecha: '2014.03.31',
		hora: '16:33:35Z+0200',
		usuarios: 'Usuarios47'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('eventoDeportivo').create( {
		idEvDep: 'IdEvDep48',
		cdEvDep: 490,
		cdDeporte: 'CdDeporte50',
		lugar: 'Lugar51',
		fecha: '2014.03.31',
		hora: '16:33:35Z+0200',
		usuarios: 'Usuarios54'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
//Data for Perfiles ---------------------------
console.log('  Creating data for  Perfiles.');

mongoose.model('perfiles').create( {
		idPerfil: 'IdPerfil55',
		cdPerfil: 560,
		dsPerfil: 'DsPerfil57'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('perfiles').create( {
		idPerfil: 'IdPerfil58',
		cdPerfil: 590,
		dsPerfil: 'DsPerfil60'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('perfiles').create( {
		idPerfil: 'IdPerfil61',
		cdPerfil: 620,
		dsPerfil: 'DsPerfil63'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('perfiles').create( {
		idPerfil: 'IdPerfil64',
		cdPerfil: 650,
		dsPerfil: 'DsPerfil66'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('perfiles').create( {
		idPerfil: 'IdPerfil67',
		cdPerfil: 680,
		dsPerfil: 'DsPerfil69'
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
//Data for Usuarios ---------------------------
console.log('  Creating data for  Usuarios.');

mongoose.model('usuarios').create( {
		idUsuario: 'IdUsuario70',
		cdUsuario: 710,
		nombre: 'Nombre72',
		apellido1: 'Apellido173',
		apellido2: 'Apellido274',
		apodo: 'Apodo75',
		cdPerfil: 760
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('usuarios').create( {
		idUsuario: 'IdUsuario77',
		cdUsuario: 780,
		nombre: 'Nombre79',
		apellido1: 'Apellido180',
		apellido2: 'Apellido281',
		apodo: 'Apodo82',
		cdPerfil: 830
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('usuarios').create( {
		idUsuario: 'IdUsuario84',
		cdUsuario: 850,
		nombre: 'Nombre86',
		apellido1: 'Apellido187',
		apellido2: 'Apellido288',
		apodo: 'Apodo89',
		cdPerfil: 900
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('usuarios').create( {
		idUsuario: 'IdUsuario91',
		cdUsuario: 920,
		nombre: 'Nombre93',
		apellido1: 'Apellido194',
		apellido2: 'Apellido295',
		apodo: 'Apodo96',
		cdPerfil: 970
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);
mongoose.model('usuarios').create( {
		idUsuario: 'IdUsuario98',
		cdUsuario: 990,
		nombre: 'Nombre100',
		apellido1: 'Apellido1101',
		apellido2: 'Apellido2102',
		apodo: 'Apodo103',
		cdPerfil: 1040
	}, function (error) { 
		if (error) {
			throw error;
		} 
	}
);

console.log('Fake Data created on: ' + dbName);
