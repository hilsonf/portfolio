angular.module('myapp')
.controller('homeCtrl', ['$scope', '$http','$firebaseArray', function ($scope, $http, $firebaseArray){
	console.log('Home controller in use');

	var ref = new Firebase('https://crackling-torch-2540.firebaseio.com/');
	$scope.artists = $firebaseArray(ref);
	

	$scope.postComment = function(){
		console.log("data",$scope.newComment);

		$scope.artists.$add({
			name: $scope.newComment.name,
			address: $scope.newComment.address
		})
	}
	

	// $http.get('js/data.json').success(function (data){
	// 	$scope.artists = data;
	// 	console.log($scope.artists);
	// })


}]);