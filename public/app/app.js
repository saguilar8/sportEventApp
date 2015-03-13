

// SampleBackend
angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'textAngular'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider

			.when('/admin',	                   		{ templateUrl: 'views/main.html',  controller: 'MainController' })

			.when('/',	                   		{ templateUrl: 'views/menu.html',  controller: 'MenuController' })
			.when('/login',                   	{ templateUrl: 'views/login.html',  controller: 'LoginController' })
			.when('/logout',                    { templateUrl: 'views/logout.html', controller: 'LogoutController' })
			.when('/import/:class', 			{ templateUrl: 'views/import.html', controller: 'ImportController' })


			.when('/deporte/',		 { templateUrl: 'views/deporte/list.html',   controller: 'ListDeporteController' })
			.when('/deporte/select',		 { templateUrl: 'views/deporte/select.html',   controller: 'SelectDeporteController' })
			.when('/deporte/add',        { templateUrl: 'views/deporte/edit.html',   controller: 'EditDeporteController' })
			.when('/deporte/edit/:id', 	 { templateUrl: 'views/deporte/edit.html',   controller: 'EditDeporteController' })
			.when('/deporte/delete/:id', { templateUrl: 'views/deporte/delete.html', controller: 'DeleteDeporteController' })
			.when('/deporte/:id', { templateUrl: 'views/deporte/view.html', controller: 'ViewDeporteController' })

			.when('/eventoDeportivo/',		 { templateUrl: 'views/eventoDeportivo/list.html',   controller: 'ListEventoDeportivoController' })
			.when('/eventoDeportivo/select',		 { templateUrl: 'views/eventoDeportivo/select.html',   controller: 'SelectEventoDeportivoController' })
			.when('/eventoDeportivo/add',        { templateUrl: 'views/eventoDeportivo/edit.html',   controller: 'EditEventoDeportivoController' })
			.when('/eventoDeportivo/edit/:id', 	 { templateUrl: 'views/eventoDeportivo/edit.html',   controller: 'EditEventoDeportivoController' })
			.when('/eventoDeportivo/delete/:id', { templateUrl: 'views/eventoDeportivo/delete.html', controller: 'DeleteEventoDeportivoController' })
			.when('/eventoDeportivo/:id', { templateUrl: 'views/eventoDeportivo/view.html', controller: 'ViewEventoDeportivoController' })

			.when('/perfiles/',		 { templateUrl: 'views/perfiles/list.html',   controller: 'ListPerfilesController' })
			.when('/perfiles/select',		 { templateUrl: 'views/perfiles/select.html',   controller: 'SelectPerfilesController' })
			.when('/perfiles/add',        { templateUrl: 'views/perfiles/edit.html',   controller: 'EditPerfilesController' })
			.when('/perfiles/edit/:id', 	 { templateUrl: 'views/perfiles/edit.html',   controller: 'EditPerfilesController' })
			.when('/perfiles/delete/:id', { templateUrl: 'views/perfiles/delete.html', controller: 'DeletePerfilesController' })
			.when('/perfiles/:id', { templateUrl: 'views/perfiles/view.html', controller: 'ViewPerfilesController' })

			.when('/usuarios/',		 { templateUrl: 'views/usuarios/list.html',   controller: 'ListUsuariosController' })
			.when('/usuarios/select',		 { templateUrl: 'views/usuarios/select.html',   controller: 'SelectUsuariosController' })
			.when('/usuarios/add',        { templateUrl: 'views/usuarios/edit.html',   controller: 'EditUsuariosController' })
			.when('/usuarios/edit/:id', 	 { templateUrl: 'views/usuarios/edit.html',   controller: 'EditUsuariosController' })
			.when('/usuarios/delete/:id', { templateUrl: 'views/usuarios/delete.html', controller: 'DeleteUsuariosController' })
			.when('/usuarios/:id', { templateUrl: 'views/usuarios/view.html', controller: 'ViewUsuariosController' })



			.otherwise({ redirectTo: '/login' });
	}])

	.constant('AUTH_EVENTS', {
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized'
	})

	.constant('USER_ROLES', {
	  admin: 'admin'
	})

	.run(['$rootScope', '$location', function($rootScope, $location) {
		// register listener to watch route changes
		$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		  if ( $rootScope.isLogged !== true  ) {
			if ( next.templateUrl == "views/login.html" ) {
			  // already going to #login, no redirect needed
			} else {
			  // not going to #login, we should redirect now (and store current ruoute for later redirect)
			  $rootScope.requestedRoute = $location.path();
			  $location.path( "/login" );
			}
		  }         
		});
	}])
;


var context = '/api';
var apiDocs = '/api-docs';

var baseUrl = '';
var documentationUrl = context + apiDocs;


angular.module('myApp').value('baseUrl', baseUrl);
angular.module('myApp').value('documentationUrl', documentationUrl);
angular.module('myApp').value('baseApi', context);
