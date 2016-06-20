var myapp = angular.module('myapp')
myapp.controller('artCtrl',['$scope','$location','$http', function($scope, $location, $http) {
   console.log('artCtrl in use');
   $('.slider').slider({full_width: true});

}]);

