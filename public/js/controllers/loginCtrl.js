
var myapp = angular.module('myapp');
myapp.controller('loginCtrl', ['$scope', '$rootScope','$firebaseObject', '$firebaseAuth','$firebaseArray','$location','$rootScope', function ($scope, $rootScope, $firebaseObject, $firebaseAuth, $firebaseArray, $location, $rootScope ){

var ref = new Firebase("https://dailydeals.firebaseio.com/deals");
var user = $firebaseObject(new Firebase("https://dailydeals.firebaseio.com/users/"));

$scope.artists = $firebaseArray(ref);
$scope.authObj = $firebaseAuth(ref);

$scope.authObj.$onAuth(function(authData){
	console.log('authData',authData);

	if(authData){
	 	var user = $firebaseObject(new Firebase("https://dailydeals.firebaseio.com/users/"+authData.uid));

	 	if (authData.provider === 'facebook') {
	 		user.profileImg = authData.facebook.profileImageURL;
	 		user.displayName = authData.facebook.displayName;
	 		user.$save();
	 		$location.path('/dashboard');
	 	}else{
	 		$location.path('/');
	 	}
	}
});

$scope.fbLogin = function(){

$scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
  $rootScope.user = authData;
}).catch(function(error) {
});

}




}]);

