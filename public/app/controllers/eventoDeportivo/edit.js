angular.module('myApp').controller('EditEventoDeportivoController', ['$scope', '$routeParams', '$location', 'EventoDeportivoService', function($scope, $routeParams, $location, EventoDeportivoService) {

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

		if($location.path() !== '/eventoDeportivo/add') {
			EventoDeportivoService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.eventoDeportivo = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}		
	}

	$scope.save = function () {
		if($location.path() === '/eventoDeportivo/add') {
			EventoDeportivoService.add($scope.eventoDeportivo).then(function () {
				$location.path('/eventoDeportivo/');
			});
		} else {
			EventoDeportivoService.update($scope.eventoDeportivo).then(function () {
				$location.path('/eventoDeportivo/');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/eventoDeportivo/');
	};

	init();

}]);
