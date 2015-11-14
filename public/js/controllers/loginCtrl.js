
var myapp = angular.module('myapp');
myapp.controller('loginCtrl', ['$scope', '$rootScope','$firebaseObject', '$firebaseAuth','$location','$rootScope', function ($scope, $rootScope, $firebaseObject, $firebaseAuth, $location, $rootScope ){

var ref = new Firebase("https://dailydeals.firebaseio.com");

var user = $firebaseObject(new Firebase("https://dailydeals.firebaseio.com/users/"));

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
	 }else if(authData === null){
	 		$location.path('/');
	 		console.log('Not logged in');
	 }

});

$scope.fbLogin = function(){

$scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
  console.log("Logged in as:", authData.uid);
  $rootScope.user = authData;
}).catch(function(error) {
  console.error("Authentication failed:", error);
});

}




}]);

