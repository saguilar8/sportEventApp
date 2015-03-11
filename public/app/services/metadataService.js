angular.module('myApp').service('MetadataService', [function () {
	var MetadataService = {};


	var metaData = {
		"deporte" 		: 	["idDeporte","cdDeporte","dsDeporte","numJugadores"],
		"eventoDeportivo" 		: 	["idEvDep","cdEvDep","cdDeporte","lugar","fecha","hora","usuarios"],
		"perfiles" 		: 	["idPerfil","cdPerfil","dsPerfil"],
		"usuarios" 		: 	["idUsuario","cdUsuario","nombre","apellido1","apellido2","apodo","cdPerfil"]
	};

	MetadataService.getPropertiesFor = function (className) {
		return (metaData[className] || [] ).slice(0);
	};

	return MetadataService;

}]);

