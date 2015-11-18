var myapp = angular.module('myapp')
myapp.controller('dealsCtrl', ['$scope','$rootScope', '$http','$firebaseArray', '$firebaseObject', '$location','$uibModal','$routeParams','Upload','$firebaseAuth', function ($scope, $rootScope, $http, $firebaseArray, $firebaseObject, $location, $uibModal, $routeParams, $upload, $firebaseAuth){
	

	var georef = new Firebase('https://dailydeals.firebaseio.com/geoFire');
  var geoFire = new GeoFire(georef);
  
  var ref = new Firebase('https://dailydeals.firebaseio.com/deals');
	$scope.artists = $firebaseArray(ref);

  var refauth = new Firebase('https://dailydeals.firebaseio.com');
  $scope.authObj = $firebaseAuth(refauth);

  $scope.fbLogout = function() {
      $scope.authObj.$unauth();
      $location.path('/');
    }

$scope.postComment = function(){

    $scope.files = new Array();
    $scope.files.push($scope.newComment.img);

    if (!$scope.files) return;
    angular.forEach($scope.files, function(file){
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
          $scope.imgID = data.public_id;
          $scope.imgUrl = 'http://res.cloudinary.com/dxrthhmgz/image/upload/v1446508534/'+data.public_id+'.'+data.format;

          $scope.artists.$add({
            itemName: $scope.newComment.itemName,
            itemPrice: $scope.newComment.itemPrice,
            itemImage: $scope.imgUrl,
            imageID : $scope.imgID ,
            address: $scope.newComment.address,
            latitude: $rootScope.latitude,
            longitude: $rootScope.longitude 
          }).then(function(ref) {
            var id = ref.key();
            geoFire.set(id, [$rootScope.latitude, $rootScope.longitude]).then(function() {
            }).catch(function(error) {
          });
          });

          $location.path('/dashboard');
          //Alerts User       
          $scope.addalert = { msg: 'Your upload was successful..'};
        }).error(function (data, status, headers, config) {
          $scope.alert = { msg: 'Sorry Your Upload Failed Try Again..'};
        });
      }
    });
        
  }

  }]);