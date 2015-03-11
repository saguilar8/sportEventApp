angular.module('myApp').controller('DeletePerfilesController', ['$scope', '$routeParams', '$location', 'PerfilesService', function($scope, $routeParams, $location, PerfilesService) {

	function init() {
		$scope.perfiles = {};
		$scope.dataReceived = false;

		if($location.path() !== '/perfiles/delete') {
			PerfilesService.getToEdit($routeParams.id).then(function (httpResponse) {
				$scope.perfiles = httpResponse.data;
				$scope.dataReceived = true;
			});
		} else {
			$scope.dataReceived = true;
		}
	}

	$scope.delete = function () {
		PerfilesService.delete($scope.perfiles._id).then(function () {
			$location.path('/perfiles/');
		});
	};

	$scope.cancel = function () {
		$location.path('/perfiles/');
	};

	init();

}]);
