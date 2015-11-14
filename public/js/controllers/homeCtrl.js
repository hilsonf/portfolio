var myapp = angular.module('myapp')
  myapp.controller('homeCtrl', ['$scope','$rootScope', '$http','$firebaseArray', '$firebaseObject', '$location','$uibModal','$routeParams','Upload','$firebaseAuth', function ($scope, $rootScope, $http, $firebaseArray, $firebaseObject, $location, $uibModal, $routeParams, $upload, $firebaseAuth){
	console.log('Home controller in use');

  	var georef = new Firebase('https://dailydeals.firebaseio.com/geoFire');
    var geoFire = new GeoFire(georef);
    
    var ref = new Firebase('https://dailydeals.firebaseio.com/deals');
    var refauth = new Firebase('https://dailydeals.firebaseio.com/users');
  	
    $scope.artists = $firebaseArray(ref);

    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$onAuth(function(authData){
      console.log('authData',authData);

      if(authData){
        console.log('you belong');
      }else {
          $location.path('/');
      };
    });

  	$scope.fbLogout = function() {
  		$scope.authObj.$unauth();
  		$location.path('/');
  	}

    var getLocation = function() {
      if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
        navigator.geolocation.getCurrentPosition(geolocationCallback);


      } else {
      }
    };



var geolocationCallback = function(location) {
    $rootScope.latitude = location.coords.latitude;
    $rootScope.longitude = location.coords.longitude;


    var lat = Number($rootScope.latitude); 
    var lng = Number($rootScope.longitude);

    var geoQuery = geoFire.query({
      center: [lat, lng],
      radius: 10000 //kilometers
    });

    $scope.mapData = [];
    $scope.distanceData = [];
    geoQuery.on("key_entered", function(key, location, distance) {
      var ref = new Firebase('https://dailydeals.firebaseio.com/deals/'+key);
      $scope.singlePlace = $firebaseObject(ref);
      $scope.distanceData.push(distance.toFixed(2));
      $scope.mapData.push($scope.singlePlace);
      console.log('Map DATA::',$scope.mapData);    
    });

      angular.extend($scope, {
      map: {
          center: {
              latitude: lat,
              longitude: lng
          },
          zoom: 11,
          markers: $scope.mapData

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

  }


  getLocation();

	$scope.removeComment = function(obj){
    //removes from cloudnary    
    $http.post('/removeComment',obj);
    $scope.artists.$remove(obj).then(function (ref){
			ref.key() === obj.$id; //true
		});

    geoFire.remove(obj.$id).then(function() {
    console.log("Provided key has been removed from GeoFire");
    $scope.mapData.splice(obj.$id, 1);
    console.log('Shit works',$scope.mapData);
  }, function(error) {
    console.log("Error: " + error);
  });
    
	}


////////MODAL OPEN
$scope.open = function (artist, index) {

	$scope.editArtist = angular.copy(artist);
	$scope.editArtistIndex = index;

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

      if($scope.editArtistImg === undefined){
        console.log("No IMG");
        save();

      }else if($scope.editArtistImg){
        console.log("IMG true", $scope.editArtistImg);

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
              save();
              
            }).error(function (data, status, headers, config) {
              console.log('DID NOT SAVE');
            });
          }//file && !file.
        });// angular forEach END
      }// ENDS else

      function save (){
        console.log('Saded to firebase');
        $scope.artists[$scope.editArtistIndex] = $scope.editArtist;
        $scope.artists.$save($scope.editArtistIndex)
        .then(function (ref){
        });
      }
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


