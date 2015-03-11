angular.module('myApp').controller('EditUsuariosController', ['$scope', '$routeParams', '$location', 'UsuariosService', function($scope, $routeParams, $location, UsuariosService) {

	function init() {
		$scope.usuarios = {
			idUsuario : '', 
			cdUsuario : 0, 
			nombre : '', 
			apellido1 : '', 
			apellido2 : '', 
			apodo : '', 
			cdPerfil : 0 
		
		};
		$scope.dataReceived = false;

		if($location.path() !== '/usuarios/add') {
			UsuariosService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.usuarios = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}		
	}

	$scope.save = function () {
		if($location.path() === '/usuarios/add') {
			UsuariosService.add($scope.usuarios).then(function () {
				$location.path('/usuarios/');
			});
		} else {
			UsuariosService.update($scope.usuarios).then(function () {
				$location.path('/usuarios/');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/usuarios/');
	};

	init();

}]);
