angular.module('myApp').service('UrlService', ['baseUrl', 'documentationUrl', '$http', '$rootScope', function(baseUrl, documentationUrl, $http, $rootScope) {
	
	var UrlService = {};	

	$http.defaults.headers.common.apikey = $rootScope.apikey;
	var apiDoc = $http.get(baseUrl + documentationUrl);

	var getApi = function (apiDocumentation, resource) {
		var api;
		if (apiDocumentation !== undefined) {
			api = findApi(apiDocumentation.apis, resource);
		}
		return api ? removeProtocol(apiDocumentation.basePath + api.path) : undefined;		
	};
	
	function findApi(apiArray, resource){
		for(var index in apiArray){
			if (apiArray[index].description.search(resource) != -1){
				return apiArray[index];
			}
		}
		return undefined;
	}

	function removeProtocol(uri) {
		return uri.replace("http://", "//")
		          .replace("https://", "//");
	}


	UrlService.deporteUrl = apiDoc.then(function (apiDocumentation) {
		return getApi(apiDocumentation.data, 'deportes');
	});

	UrlService.eventoDeportivoUrl = apiDoc.then(function (apiDocumentation) {
		return getApi(apiDocumentation.data, 'eventoDeportivos');
	});

	UrlService.perfilesUrl = apiDoc.then(function (apiDocumentation) {
		return getApi(apiDocumentation.data, 'perfiles');
	});

	UrlService.usuariosUrl = apiDoc.then(function (apiDocumentation) {
		return getApi(apiDocumentation.data, 'usuarios');
	});

	
	return UrlService;

}]);
