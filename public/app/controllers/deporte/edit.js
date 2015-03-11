angular.module('myApp').controller('EditDeporteController', ['$scope', '$routeParams', '$location', 'DeporteService', function($scope, $routeParams, $location, DeporteService) {

	function init() {
		$scope.deporte = {
			idDeporte : '', 
			cdDeporte : 0, 
			dsDeporte : '', 
			numJugadores : 0 
		
		};
		$scope.dataReceived = false;

		if($location.path() !== '/deporte/add') {
			DeporteService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.deporte = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}		
	}

	$scope.save = function () {
		if($location.path() === '/deporte/add') {
			DeporteService.add($scope.deporte).then(function () {
				$location.path('/deporte/');
			});
		} else {
			DeporteService.update($scope.deporte).then(function () {
				$location.path('/deporte/');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/deporte/');
	};

	init();

}]);
