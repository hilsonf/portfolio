angular.module('myapp')
.config(function ($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl: 'views/login.html',
		controller: 'loginCtrl', function ($scope, $http){ 
		}
	})
	.when('/dashboard',{
		templateUrl: 'views/home.html',
		controller: 'homeCtrl', function ($scope, $http){ 
		}
	})
	.when('/update',{
		templateUrl: 'views/update.html',
		controller: 'homeCtrl', function ($scope, $http){ 
		}
	})
	.otherwise('/')
})