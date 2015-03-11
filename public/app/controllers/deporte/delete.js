angular.module('myApp').controller('DeleteDeporteController', ['$scope', '$routeParams', '$location', 'DeporteService', function($scope, $routeParams, $location, DeporteService) {

	function init() {
		$scope.deporte = {};
		$scope.dataReceived = false;

		if($location.path() !== '/deporte/delete') {
			DeporteService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.deporte = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}
	}

	$scope.delete = function () {
		DeporteService.delete($scope.deporte._id).then(function () {
			$location.path('/deporte/');
		});
	};

	$scope.cancel = function () {
		$location.path('/deporte/');
	};

	init();

}]);
