angular.module('myApp').controller('DetalleEventodeportivoController', ['$scope', '$routeParams', '$location', 'EventoDeportivoService', 'UsuarioService', 'NavigationService', function ($scope, $routeParams, $location,EventoDeportivoService, UsuarioService, NavigationService) {
	$scope.eventoDeportivo = {};
	$scope.usuario = {};
	$scope.dataReceived = false;


	$scope.back = function () {
		$location.path('/menu');
	};

	$scope.seleccionarUsuario= function() {
		//save context
		NavigationService.push($location.path(), "SelectUsuario", null); //$scope);
		$location.path('/usuarios/select');
		//select familia and back
	};
	function seleccionarUsuariosBack() {
		var navItem = NavigationService.pop();
		//$scope = navItem.state;
		var usuario = navItem.returnData;
		$scope.eventoDeportivo.usuario = usuario.idUsuario;
		$scope.usuario = usuario;
		
		saveChanges();
	}

	function remove(arr, item) {
	      for(var i = arr.length; i--;) {
	          if(arr[i] === item) {
	              arr.splice(i, 1);
	          }
	      }
	}

	function saveChanges() {
		EventoDeportivoService.update($scope.eventoDeportivo)
			.then(function(httpResponse) {
				$scope.eventoDeportivo = httpResponse.data;
			});
	}

	function loadUsuario(httpResponse) {
		$scope.usuario = httpResponse.data;
	}
	function errorHandler(httpError) {
	}

	function loadEventoDeportivo() {
		$scope.dataReceived = false;
		EventoDeportivoService.getToEdit($routeParams.id)
			.then(loadedEventoDeportivo, errorHandler);
	}
	function loadedEventoDeportivo(httpResponse) {
		$scope.eventoDeportivo = httpResponse.data;
		
		if ($scope.eventoDeportivo.usuario) {
			UsuarioService.getToEdit($scope.eventoDeportivo.usuario)
				.then(loadUsuario, errorHandler);
		}
		$scope.dataReceived = true;
	}

	function init() {
		EventoDeportivoService.getToEdit($routeParams.id)
			.then(function (httpResponse) {
				$scope.eventoDeportivo = httpResponse.data;
				
				if ($scope.eventoDeportivo.usuario) {
					UsuarioService.getToEdit($scope.eventoDeportivo.usuario)
						.then(loadUsuario, errorHandler);
				}
				$scope.dataReceived = true;

				//Navigate back from selection
				

				if (NavigationService.isReturnFrom('SelectUsuario')) {
					seleccionarUsuarioBack();
				}
			});
	}

	init();

}]);