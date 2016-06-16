angular.module('myapp')
.config(function ($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl: 'views/home.html' 
	})
	.when('/projects',{
		templateUrl: 'views/projects.html',
		controller: 'projectsCtrl', function ($scope, $http){ 
		} 
	})
	.when('/project1',{
		templateUrl: 'views/project1.html' 
	})
	.when('/project2',{
		templateUrl: 'views/project2.html' 
	})
	.when('/project3',{
		templateUrl: 'views/project3.html' 
	})
	.when('/project4',{
		templateUrl: 'views/project4.html' 
	})
	.when('/project5',{
		templateUrl: 'views/project5.html' 
	})
	.when('/project6',{
		templateUrl: 'views/project6.html' 
	})
	.when('/art',{
		templateUrl: 'views/art.html', 
		controller: 'artCtrl', function ($scope, $http){ 
		}
	})
	.otherwise('/')
})