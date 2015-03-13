angular.module('myApp').controller('MenuController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

	$scope.gotoUsuarios = function() {
		$location.path('/usuarios');
	};
	$scope.gotoPerfiles = function() {
		$location.path('/perfiles');
	};
	$scope.gotoDeportes = function() {
		$location.path('/deporte');
	};
	$scope.gotoEventosDeportivos = function() {
		$location.path('/eventoDeportivo');
	};
	$scope.gotoAdmin = function() {
		$location.path('/admin');
	};
	$scope.gotoAppMovil = function() {
		$location.path('/appMovil');
	};
}]);