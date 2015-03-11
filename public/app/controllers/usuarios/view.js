angular.module('myApp').controller('ViewUsuariosController', ['$scope', '$routeParams', '$location', 'UsuariosService', function($scope, $routeParams, $location, UsuariosService) {

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

		UsuariosService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.usuarios = httpResponse.data;
			$scope.dataReceived = true;
		});

	}

	$scope.gotoList = function (event) {
		$location.path('/usuarios/');
	};	
	$scope.edit = function (event) {
		$location.path('/usuarios/edit/' + $scope.usuarios._id );
	};

	init();

}]);
