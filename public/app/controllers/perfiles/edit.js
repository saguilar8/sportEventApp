angular.module('myApp').controller('EditPerfilesController', ['$scope', '$routeParams', '$location', 'PerfilesService', function($scope, $routeParams, $location, PerfilesService) {

	function init() {
		$scope.perfiles = {
			idPerfil : '', 
			cdPerfil : 0, 
			dsPerfil : '' 
		
		};
		$scope.dataReceived = false;

		if($location.path() !== '/perfiles/add') {
			PerfilesService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.perfiles = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}		
	}

	$scope.save = function () {
		if($location.path() === '/perfiles/add') {
			PerfilesService.add($scope.perfiles).then(function () {
				$location.path('/perfiles/');
			});
		} else {
			PerfilesService.update($scope.perfiles).then(function () {
				$location.path('/perfiles/');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/perfiles/');
	};

	init();

}]);
