var myapp = angular.module('myapp')
myapp.controller('projectsCtrl',['$scope','$location', function($scope, $location) {
   console.log('projectsCtrl in use');

   $scope.proj1 = function() {
        $location.path('/project1');
    }
    $scope.proj2 = function() {
        $location.path('/project2');
    }
    $scope.proj3 = function() {
        $location.path('/project3');
    }
    $scope.proj4 = function() {
        $location.path('/project4');
    }
    $scope.proj5 = function() {
        $location.path('/project5');
    }
    $scope.proj6 = function() {
        $location.path('/project6');
    }
  
}]);