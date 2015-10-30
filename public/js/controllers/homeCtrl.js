var myapp= angular.module('myapp')
myapp.controller('homeCtrl', ['$scope','$rootScope', '$http', 'Auth','$firebaseArray','$location','$uibModal', function ($scope, $rootScope, $http, Auth, $firebaseArray, $location, $uibModal){
	console.log('Home controller in use');

	
	myapp.factory("Auth", function ($firebaseAuth){
	var ref = new Firebase("https://dailydeals.firebaseio.com/");
	return $firebaseAuth(ref);
	});

	var ref = new Firebase('https://dailydeals.firebaseio.com/');

	$scope.artists = $firebaseArray(ref);

	$scope.fbLogout = function() {
		Auth.$unauth();
		$location.path('/');
	}
	
	$scope.postComment = function(){
		$scope.artists.$add({
			itemName: $scope.newComment.itemName,
			itemPrice: $scope.newComment.itemPrice,
			address: $scope.newComment.address
		})
		// $location.path('/dashboard');
	}

	$scope.removeComment = function(obj){
		$scope.artists.$remove(obj).then(function (ref){
			ref.key() === obj.$id; //true
		});
	}


////////MODAL OPEN
$scope.open = function (artist, index) {

	$scope.editArtist = angular.copy(artist);
	$scope.editArtistIndex = index;

	console.log(artist);
	console.log($scope.editArtist);

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

}]);

///UPDATE FUNCTION IN MODAL
var ModalCtrl = function ($firebaseArray, $scope, $uibModalInstance, artist, index) {
	var ref = new Firebase('https://dailydeals.firebaseio.com/');
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






