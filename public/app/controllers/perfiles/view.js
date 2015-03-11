angular.module('myApp').controller('ViewPerfilesController', ['$scope', '$routeParams', '$location', 'PerfilesService', function($scope, $routeParams, $location, PerfilesService) {

	function init() {
		$scope.perfiles = {
			idPerfil : '', 
			cdPerfil : 0, 
			dsPerfil : '' 
		
		};
		$scope.dataReceived = false;

		PerfilesService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.perfiles = httpResponse.data;
			$scope.dataReceived = true;
		});

	}

	$scope.gotoList = function (event) {
		$location.path('/perfiles/');
	};	
	$scope.edit = function (event) {
		$location.path('/perfiles/edit/' + $scope.perfiles._id );
	};

	init();

}]);
