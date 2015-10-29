angular.module('myapp')
.controller('homeCtrl', ['$scope', '$http','$firebaseArray','$location','$uibModal', function ($scope, $http, $firebaseArray, $location, $uibModal){
	console.log('Home controller in use');

	var ref = new Firebase('https://crackling-torch-2540.firebaseio.com/');
	$scope.artists = $firebaseArray(ref);
	

	$scope.postComment = function(){
		// console.log("data",$scope.newComment);

		$scope.artists.$add({
			name: $scope.newComment.name,
			address: $scope.newComment.address
		})
		$location.path('/');
	}

	$scope.removeComment = function(obj){
		$scope.artists.$remove(obj).then(function (ref){
			ref.key() === obj.$id; //true
		});
	}

	// $scope.updateComment = function(artist, index){
	// 	console.log(artist);
	// 	$scope.editArtist = angular.copy(artist);
	// 	$scope.editArtistIndex = index

	// }

	// $scope.updateInfo = function(){
	// 	console.log($scope.editArtist);
	// 	$scope.artists[$scope.editArtistIndex] = $scope.editArtist;
	// 	$scope.artists.$save($scope.editArtistIndex).then(function (ref){
	// 		console.log(ref);
	// 	});


	// }
////////MODAL
$scope.open = function (artist, index) {

	$scope.editArtist = angular.copy(artist);
	$scope.editArtistIndex = index

    var modalInstance = $uibModal.open({
      templateUrl: './views/modal.html',
      controller: ModalCtrl,
      resolve: {
      	artist: function(){
      		return $scope.editArtist;
      	},
      	index: function(){
      		return $scope.editArtistIndex;
      	}
      }
      })


    };






	// get json data
	// $http.get('js/data.json').success(function (data){
	// 	$scope.artists = data;
	// 	console.log($scope.artists);
	// })


}]);


var ModalCtrl = function ($firebaseArray, $scope, $uibModalInstance, artist, index) {
	var ref = new Firebase('https://crackling-torch-2540.firebaseio.com/');
	$scope.artists = $firebaseArray(ref);

    $scope.editArtist = angular.copy(artist);
    $scope.editArtistIndex = index
  
  $scope.ok = function () {

  	$scope.artists[$scope.editArtistIndex] = $scope.editArtist;
	$scope.artists.$save($scope.editArtistIndex).then(function (ref){
		console.log(ref);
	});

    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


};






