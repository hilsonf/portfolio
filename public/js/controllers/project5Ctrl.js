var myapp = angular.module('myapp')
myapp.controller('project5Ctrl',['$scope','$location','$http', function($scope, $location, $http) {
   console.log('project5CTRL in use');
	$('.materialboxed').materialbox();
}]);

