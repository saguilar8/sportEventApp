angular.module('myApp').controller('DeleteUsuariosController', ['$scope', '$routeParams', '$location', 'UsuariosService', function($scope, $routeParams, $location, UsuariosService) {

	function init() {
		$scope.usuarios = {};
		$scope.dataReceived = false;

		if($location.path() !== '/usuarios/delete') {
			UsuariosService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.usuarios = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}
	}

	$scope.delete = function () {
		UsuariosService.delete($scope.usuarios._id).then(function () {
			$location.path('/usuarios/');
		});
	};

	$scope.cancel = function () {
		$location.path('/usuarios/');
	};

	init();

}]);
