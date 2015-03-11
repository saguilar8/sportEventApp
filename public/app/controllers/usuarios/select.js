angular.module('myApp').controller('SelectUsuariosController', ['$http', '$scope', '$location', '$q', '$timeout', 'NavigationService', 'UsuariosService', function($http, $scope, $location, $q, $timeout, NavigationService, UsuariosService) {
	
	function init() {
		$scope.dataList = [];
		$scope.allSelected = false;
		$scope.noneSelected = true;
		$scope.dataReceived = false;
		$scope.pageSize = 12;
		$scope.currentPage = 1;
		$scope.totalItems = 0;
		$scope.searchText = '';	

		$scope.refresh();
	}

	$scope.select = function(retData) {
		NavigationService.setReturnData(retData);
		$location.path(NavigationService.getReturnUrl());
	};
	
	$scope.loadCurrentPage = function () {
		//$scope.dataReceived = false;
		UsuariosService.getList({ 
			'page'     : $scope.currentPage,
			'pageSize' : $scope.pageSize,
			'searchText' : $scope.searchText
		})
		.then(function(httpResponse) {
			$scope.dataList = httpResponse.data;
		})
		.catch(function(err) {
			if (err) {
				console.error(err);
			}
		})
		.finally(function() {
			$scope.dataReceived = true;
			$scope.$digest();
		});
	};	
	
	$scope.updateRecordCount = function () {
		UsuariosService.getCount({ 
			'searchText' : $scope.searchText
		})
		.catch(function(err) {
			if (err) {
				console.error(err);
			}
		})
		.then(function(httpResponse) {
			$scope.totalItems = Number(httpResponse.data);
		});
	};
	
	$scope.clearSearch = function() {
		$scope.searchText = '';
		$scope.refresh();
	};

	$scope.refresh = function () {
		$scope.updateRecordCount();
		$scope.currentPage = 1;
		$scope.loadCurrentPage();
	};

	init();
}]);
