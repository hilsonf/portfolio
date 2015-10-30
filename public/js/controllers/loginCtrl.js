
var myapp = angular.module('myapp');


myapp.factory("Auth", function ($firebaseAuth){
var ref = new Firebase("https://dailydeals.firebaseio.com/");
return $firebaseAuth(ref);
});
	

myapp.controller('loginCtrl', ['$scope', 'Auth','$location','$rootScope', function ($scope, Auth, $location, $rootScope ){
	console.log('Login controller in use');	

	//getting auth data 
	// Auth.$onAuth = function(authData){
	// $scope.authData = authData;
	// console.log("when $onAuth :::: ",authData);
	// }

	/// LOGIN
	$scope.fbLogin = function(){
	Auth.$authWithOAuthPopup("facebook").then(function(authData){
	$rootScope.user = authData;

	// console.log("User ::", $rootScope.user);

	$location.path('/dashboard');

	})
	.catch(function(error) {
	console.log(error);
	$location.path('/');
	});
	}

	$scope.logout = function() {
	Auth.$unauth();
	}


}]);

