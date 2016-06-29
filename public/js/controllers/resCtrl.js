var myapp = angular.module('myapp')
myapp.controller('resCtrl',['$scope','$location','$http', function($scope, $location, $http) {
   console.log('resCTRL in use');
	$('.materialboxed').materialbox();
}]);

