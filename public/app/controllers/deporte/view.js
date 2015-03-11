angular.module('myApp').controller('ViewDeporteController', ['$scope', '$routeParams', '$location', 'DeporteService', function($scope, $routeParams, $location, DeporteService) {

	function init() {
		$scope.deporte = {
			idDeporte : '', 
			cdDeporte : 0, 
			dsDeporte : '', 
			numJugadores : 0 
		
		};
		$scope.dataReceived = false;

		DeporteService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.deporte = httpResponse.data;
			$scope.dataReceived = true;
		});

	}

	$scope.gotoList = function (event) {
		$location.path('/deporte/');
	};	
	$scope.edit = function (event) {
		$location.path('/deporte/edit/' + $scope.deporte._id );
	};

	init();

}]);
