var myapp = angular.module('myapp')
myapp.controller('artCtrl',['$scope','$location', function($scope, $location) {
   console.log('artCtrl in use');
   $scope.images=[{src:'art1.png',title:'Pic 1'},{src:'art2.png',title:'Pic 2'},{src:'art3.png',title:'Pic 3'}]; 
}]);

 
myapp.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
			console.log(scope.currentIndex);
		};

		scope.select=function(index){

			if (index == 0) {
				scope.currentIndex = 0;
			}else if (index == 1) {
				scope.currentIndex = 1;
			}else if (index == 2) {
				scope.currentIndex = 2;
			}else if (index == 3) {
				scope.currentIndex = 3;
			};

		}

		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,9000);
			},9000);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'views/slider.html'
  }
});