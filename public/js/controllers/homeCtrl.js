var myapp= angular.module('myapp')
myapp.controller('homeCtrl', ['$scope','$rootScope', '$http', 'Auth','$firebaseArray','$location','$uibModal','$routeParams','Upload', function ($scope, $rootScope, $http, Auth, $firebaseArray, $location, $uibModal, $routeParams, $upload){
	console.log('Home controller in use');


	myapp.factory("Auth", function ($firebaseAuth){
	var ref = new Firebase("https://dailydeals.firebaseio.com/");
	return $firebaseAuth(ref);
	});

	var ref = new Firebase('https://dailydeals.firebaseio.com/');

	$scope.artists = $firebaseArray(ref);


    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
            fields: {
              upload_preset: $.cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title
            },
            file: file
          }).success(function (data, status, headers, config) {
            $scope.imgUrl = 'http://res.cloudinary.com/dxrthhmgz/image/upload/v1446508534/'+data.public_id+'.'+data.format;
            console.log($scope.imgUrl);
          }).error(function (data, status, headers, config) {
          });
        }
      });
    };


	$scope.fbLogout = function() {
		Auth.$unauth();
		$location.path('/');
	}
	
	$scope.postComment = function(){
		$scope.artists.$add({
			itemName: $scope.newComment.itemName,
			itemPrice: $scope.newComment.itemPrice,
      itemImage: $scope.imgUrl,
			address: $scope.newComment.address
		})
		// $location.path('/dashboard');
    $scope.alert = { msg: 'Your upload was successful!!'};
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








