angular.module('myapp')
.controller('ModalCtrl', ['$scope', '$firebaseArray','$uibModalInstance', function ($scope, $firebaseArray, $uibModalInstance){


$scope.ok = function () {
     $uibModalInstance.close();
  };

$scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };

}]);