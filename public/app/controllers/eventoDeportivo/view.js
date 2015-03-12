angular.module('myApp').controller('ViewEventoDeportivoController', ['$scope', '$routeParams', '$location', 'EventoDeportivoService', function($scope, $routeParams, $location, EventoDeportivoService) {

	function init() {
		$scope.eventoDeportivo = {
			idEvDep : '', 
			cdEvDep : 0, 
			cdDeporte : '', 
			lugar : '', 
			fecha : new Date(0), 
			hora : new Date(0), 
			usuarios : '' 
		
		};
		$scope.dataReceived = false;

		EventoDeportivoService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.eventoDeportivo = httpResponse.data;
			$scope.dataReceived = true;
		});

	}

	$scope.gotoList = function (event) {
		$location.path('/eventoDeportivo/');
	};	
	$scope.edit = function (event) {
		$location.path('/eventoDeportivo/edit/' + $scope.eventoDeportivo._id );
	};

	init();

}]);