angular.module('myApp').controller('MainController', ['$scope', '$location', function ($scope, $location) {

	$scope.serviceUriBase = $location.protocol() + '://' + $location.host() + ":" + $location.port();	
}]);