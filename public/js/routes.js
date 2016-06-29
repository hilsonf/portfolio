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
	.when('/designs',{
		templateUrl: 'views/designs.html',
		controller: 'designsCtrl', function ($scope, $http){ 
		}  
	})
	.when('/resume',{
		templateUrl: 'views/resume.html',
		controller: 'resCtrl', function ($scope, $http){ 
		}  
	})
	.otherwise('/')
})