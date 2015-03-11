angular.module('myApp').controller('DeleteEventoDeportivoController', ['$scope', '$routeParams', '$location', 'EventoDeportivoService', function($scope, $routeParams, $location, EventoDeportivoService) {

	function init() {
		$scope.eventoDeportivo = {};
		$scope.dataReceived = false;

		if($location.path() !== '/eventoDeportivo/delete') {
			EventoDeportivoService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.eventoDeportivo = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}
	}

	$scope.delete = function () {
		EventoDeportivoService.delete($scope.eventoDeportivo._id).then(function () {
			$location.path('/eventoDeportivo/');
		});
	};

	$scope.cancel = function () {
		$location.path('/eventoDeportivo/');
	};

	init();

}]);
