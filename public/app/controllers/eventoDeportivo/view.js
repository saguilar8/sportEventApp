angular.module('myApp').controller('ViewEventoDeportivoController', [ '$http', '$rootScope', '$scope', '$routeParams', '$location', 'EventoDeportivoService', 'UsuariosService', 'NavigationService', function($http, $rootScope, $scope, $routeParams, $location, EventoDeportivoService, UsuariosService, NavigationService) {

	$scope.eventoDeportivo ={};
	$scope.dataReceived = false;

	function errorHandlerLoad(httpError) {
		$scope.errors = UserErrorService.translateErrors(httpError, "query");
	}
	function errorHandler(httpError) {
		$scope.errors = UserErrorService.translateErrors(httpError, "update");
	}

	function formatFechaFromText(dtext) {
		if (!dtext) {
			return '-';
		}
		var dt = new Date(Date.parse(dtext));

		var df = dt.getDate() + '/' +
			     (dt.getMonth()+1) + '/' + 
			     dt.getFullYear();
		return df;			      
	}

	function formatHoraFromText(dtext) {
		if (!dtext) {
			return '-';
		}
		var dt = new Date(Date.parse(dtext));

		var h = dt.getHours() + ':' +
			     dt.getMinutes();
		return h;			      
	}

	function loadEventoDeportivo() {
		$scope.dataReceived = false;
		EventoDeportivoService.getUsuarios($routeParams.id)
								.then(dataLoaded, errorHandlerLoad);
	}

	$scope.addUsuario = function() {
		//save context
		NavigationService.push($location.path(), "SelectUsuario", null );
		$location.path('/usuarios/select');
		//select and back
	};

	function seleccionarUsuarioBack() {
		var navItem = NavigationService.pop();
		var usuario = navItem.returnData;
		addNewUsuario(usuario);
		//saveChanges();
	}

	function addNewUsuario (usuario) {
		EventoDeportivoService.addUsuario($routeParams.id, usuario._id, null)
			.then(loadEventoDeportivo, errorHandlerLoad );
	}

	$scope.deleteUsuario = function(usuario) {
		remove($scope.eventoDeportivo.usuarios, usuario);
		saveChanges();
	};

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
			//	calcularEstadoPrestaciones($scope.planAsistencial);
			});
	}

	function loadEventoDeportivo() {
		$scope.dataReceived = false;
		EventoDeportivoService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.eventoDeportivo = httpResponse.data;
			$scope.dataReceived = true;
		});
	}

	function dataLoaded(httpResponse) {
		$scope.eventoDeportivo = httpResponse.data.eventoDeportivo;
		$scope.usarios = httpResponse.data.usuarios;
		$scope.errors = null;
		$scope.dataReceived = true;
	}
	
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

		if (NavigationService.isReturnFrom('SelectUsuario')) {
			seleccionarUsuarioBack();
			return;
		}

		if ($routeParams.id) {
			loadEventoDeportivo();			
		} else {
			$scope.dataReceived = true;
		}

	}

	$scope.gotoList = function (event) {
		$location.path('/eventoDeportivo/');
	};	
	$scope.edit = function (event) {
		$location.path('/eventoDeportivo/edit/' + $scope.eventoDeportivo._id );
	};

	init();

}]);
