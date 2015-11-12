var myapp = angular.module('myapp')
myapp.controller('homeCtrl', ['$scope','$rootScope', '$http', 'Auth','$firebaseArray', '$firebaseObject', '$location','$uibModal','$routeParams','Upload', function ($scope, $rootScope, $http, Auth, $firebaseArray, $firebaseObject, $location, $uibModal, $routeParams, $upload){
	console.log('Home controller in use');


	myapp.factory("Auth", function ($firebaseAuth){
	var ref = new Firebase("https://dailydeals.firebaseio.com/");
	return $firebaseAuth(ref);
	});

	var georef = new Firebase('https://dailydeals.firebaseio.com/geoFire');
  var geoFire = new GeoFire(georef);
  
  var ref = new Firebase('https://dailydeals.firebaseio.com/deals');
	$scope.artists = $firebaseArray(ref);

  //Logout 
	$scope.fbLogout = function() {
		Auth.$unauth();
		$location.path('/');
	}

  var getLocation = function() {
    if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
      navigator.geolocation.getCurrentPosition(geolocationCallback);
    } else {
    }
  };

  var geolocationCallback = function(location) {
  $scope.latitude = location.coords.latitude;
  $scope.longitude = location.coords.longitude;

    var geoQuery = geoFire.query({
      center: [Number($scope.latitude), Number($scope.longitude)],
      radius: 10.609 //kilometers
    });

    //$scope.resKeys = [];
    $scope.mapData = [];
    geoQuery.on("key_entered", function(key, location, distance) {
      //console.log("Bicycle shop " + key + " found at " + location + " (" + distance + " km away)");
       
       
       var ref = new Firebase('https://dailydeals.firebaseio.com/deals/'+key);
       $scope.singlePlace = $firebaseObject(ref);
       $scope.singlePlace.id = key;
       $scope.mapData.push($scope.singlePlace);
       console.log('Shit works',$scope.mapData);
  });

      angular.extend($scope, {
      map: {
          center: {
              latitude: 28.538335,
              longitude: -81.379236
          },
          zoom: 11,
          markers: $scope.mapData

      }
    });

    $scope.windowOptions = {
        visible: false
    };
  
  }



  getLocation();
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
            latitude: $scope.latitude,
            longitude: $scope.longitude 
          }).then(function(ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            //list.$indexFor(id); // returns location in the array
            geoFire.set(id, [$scope.latitude, $scope.longitude]).then(function() {
              console.log("GeoFire Saved at", id);
            }).catch(function(error) {
             console.log("Error adding location to GeoFire");
          });
          });


          $location.path('/');
   
          //Alerts User       
          $scope.addalert = { msg: 'Your upload was successful..'};
        }).error(function (data, status, headers, config) {
          $scope.alert = { msg: 'Sorry Your Upload Failed Try Again..'};
        });
      }
    });
      	
	}

	$scope.removeComment = function(obj){
    //removes from cloudnary    
    $http.post('/removeComment',obj);
    $scope.artists.$remove(obj).then(function (ref){
			ref.key() === obj.$id; //true
		});
    $scope.removealert = { msg: 'Your file was sucessfully deleted'};
	}


////////MODAL OPEN
$scope.open = function (artist, index) {

	$scope.editArtist = angular.copy(artist);
	$scope.editArtistIndex = index;

	// console.log($scope.editArtist);

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



$scope.getAddress = function(artist, index){

  $scope.artist = artist;
  $scope.Idx    = index;

  var modalInstance = $uibModal.open({
    templateUrl: './views/map.html',
    controller: mapCtrl,
      resolve: {
        artist: function(){
          return $scope.artist;
        },
        index: function(){
          return $scope.Idx;
        }
      }
    })

};



}]);



///UPDATE FUNCTION IN MODAL
var ModalCtrl = function ($firebaseArray, $scope, $uibModalInstance, artist, index, Upload, $routeParams ) {

  $upload = Upload;
	var ref = new Firebase('https://dailydeals.firebaseio.com/deals');
	$scope.artists = $firebaseArray(ref);

    $scope.editArtist = angular.copy(artist);
    $scope.editArtistIndex = index;
  
  	$scope.ok = function () {

      $scope.files = new Array();
      $scope.files.push($scope.editArtistImg);
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
          
          $scope.editArtist.itemImage = 'http://res.cloudinary.com/dxrthhmgz/image/upload/v1446508534/'+data.public_id+'.'+data.format;
          $scope.artists[$scope.editArtistIndex] = $scope.editArtist;

          // console.log("OLD Artist:",   $scope.artists);
          // console.log("New ARTIST:",  $scope.editArtist);
          // console.log("My Target:", $scope.artists[$scope.editArtistIndex]);
          
          $scope.artists.$save($scope.editArtistIndex)
          .then(function (ref){
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


var mapCtrl = function($scope, $uibModalInstance, $firebaseArray, $location, artist, index) {
   
    var ref = new Firebase('https://dailydeals.firebaseio.com/deals');
    $scope.artists = $firebaseArray(ref);

    artist.id = index;

    angular.extend($scope, {
        map: {
            center: {
                latitude: 28.538335,
                longitude: -81.379236
            },
            zoom: 11,
            markers: [artist]

        }
    });



        $scope.windowOptions = {
            visible: false
        };

        $scope.onClick = function() {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };

        $scope.closeClick = function() {
            $scope.windowOptions.visible = false;
        };

  $uibModalInstance.close();

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };

  }


