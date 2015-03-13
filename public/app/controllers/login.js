angular.module('myApp').controller('LoginController', ['$scope', '$rootScope', '$cookies', 'AuthService', '$location', function ($scope, $rootScope, $cookies, AuthService, $location) {

	$rootScope.isLogged = false;	
	$rootScope.apikey = null; 

	$scope.roles = [
      {name:'Usuario', key:'USU'},
      {name:'Administrador', key:'ADM'}
    ];

	$scope.credentials = {
		role : $scope.roles[0],
		username : '',
		userPassword : '',
		errorMessage: null
	};
	
	$scope.login = function () {
		AuthService.login($scope.credentials)
			.then(function (user) {
				$scope.errorMessage = null;
				$rootScope.isLogged = true;
				$rootScope.apikey = $scope.credentials.apikey;
				if ($rootScope.requestedRoute) {
					var route = $rootScope.requestedRoute;
					$rootScope.requestedRoute = null;
					$location.path(route);
				} else {
					$location.path('/');
				}				
			}, function () {
				$rootScope.isLogged = false;		
				$rootScope.apikey = null;
				$scope.errorMessage = "La clave introducida no es correcta";
			});
	};

	function getName(cred) {
		var key =cred.role.key;
		if (key == 'TS') {
			return 'Nerea Gomez';
		}
		else if  (key == 'PRO') {
			return 'Luz Mondariz';
		}
		else if  (key == 'ADM') {
			return 'Alicia Eneko';
		}
		return 'Sara Gil';
	}
	
	$scope.init = function() {
		//autologin if cookie
		if ($cookies.apikey != null && $cookies.apikey!='null') {
			$scope.credentials.apikey = $cookies.apikey;
			$scope.login(); //autologin
		}
	};
	
	$scope.init();
	  
}]);