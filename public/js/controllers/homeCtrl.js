var myapp = angular.module('myapp')
myapp.controller('homeCtrl', ['$scope','$rootScope', '$http', 'Auth','$firebaseArray','$location','$uibModal','$routeParams','Upload', function ($scope, $rootScope, $http, Auth, $firebaseArray, $location, $uibModal, $routeParams, $upload){
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
    $scope.files = new Array();
    $scope.files.push($scope.newComment.img);

    console.log($scope.files);

    if (!$scope.files) return;
    angular.forEach($scope.files, function(file){
      console.log("loop");
      if (file && !file.$error) {
        file.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
          fields: {
            upload_preset: $.cloudinary.config().upload_preset,
            tags: 'myphotoalbum',
            context: 'photo=' + $scope.title
          },
          file: file
        }).success(function (data) {
          console.log('SAVED TO cloudinary');
          $scope.imgID = data.public_id;
          $scope.imgUrl = 'http://res.cloudinary.com/dxrthhmgz/image/upload/v1446508534/'+data.public_id+'.'+data.format;
          
          console.log(data.public_id);

          console.log($scope.imgUrl);

          $scope.artists.$add({
            itemName: $scope.newComment.itemName,
            itemPrice: $scope.newComment.itemPrice,
            itemImage: $scope.imgUrl,
            imageID : $scope.imgID ,
            address: $scope.newComment.address
          })
          // $location.path('/dashboard');
          $scope.alert = { msg: 'Your upload was successful!!'};
        }).error(function (data, status, headers, config) {
          console.log('DID NOT SAVE');
        });
      }
    });

		
	}

	$scope.removeComment = function(obj){

    console.log('REMOVED::',obj);
    
    $http.post('/removeComment',obj);
		
    $scope.artists.$remove(obj).then(function (ref){
			ref.key() === obj.$id; //true
		});



	}


////////MODAL OPEN
$scope.open = function (artist, index) {

	$scope.editArtist = angular.copy(artist);
	$scope.editArtistIndex = index;

	console.log($scope.editArtist);

  // $http.post('/removeComment',$scope.editArtist);

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
var ModalCtrl = function ($firebaseArray, $scope, $uibModalInstance, artist, index, Upload, $routeParams ) {

  $upload = Upload;
	var ref = new Firebase('https://dailydeals.firebaseio.com/');
	$scope.artists = $firebaseArray(ref);

    $scope.editArtist = angular.copy(artist);
    $scope.editArtistIndex = index;
  
  	$scope.ok = function () {

      console.log('ITS OK')
      $scope.files = new Array();
      $scope.files.push($scope.editArtist.img);
      if (!$scope.files) return;
      angular.forEach($scope.files, function(file){
      console.log("loop");
      if (file && !file.$error) {
        file.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
          fields: {
            upload_preset: $.cloudinary.config().upload_preset,
            tags: 'myphotoalbum',
            context: 'photo=' + $scope.title
          },
          file: file
        }).success(function (data) {
          console.log('SAVED TO cloudinary');
          
          // $scope.editArtist.imageID   = data.public_id;
          $scope.editArtist.itemImage = 'http://res.cloudinary.com/dxrthhmgz/image/upload/v1446508534/'+data.public_id+'.'+data.format;
          $scope.artists[$scope.editArtistIndex] = $scope.editArtist;

          console.log("OLD Artist:",   $scope.artists);
          console.log("New ARTIST:",  $scope.editArtist);
          console.log("My Target:", $scope.artists[$scope.editArtistIndex]);
          
          $scope.artists.$save($scope.editArtistIndex)
          .then(function (ref){
            console.log(ref);
          });

        }).error(function (data, status, headers, config) {
          console.log('DID NOT SAVE');
        });
      }//file && !file.
    });// angular forEach END



	    $uibModalInstance.close();
  	};//end OK

	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};

};








