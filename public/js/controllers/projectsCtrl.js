var myapp = angular.module('myapp')
myapp.controller('projectsCtrl',['$scope','$location', function($scope, $location) {
   console.log('projectsCtrl in use');
   $scope.images=[
   				  { src:'img1.png',
   					title:'Pic 1',
   					projectName:'Lets Mow',
   					projectInfo:'Info for Lets Mow...',
   					link:'/project1'},
   				  { src:'img2.png',
   				  	projectName:'DJ Qjack',
   				  	projectInfo:'Info for DJ Qjack...',
   				  	title:'Pic 2',
   				  	link:'/project2'},
   				  { src:'img3.png',
   				    projectName:'Mountain Top',
   				    projectInfo:'Info for Mountain Top...',
   				  	title:'Pic 3',
   				  	link:'/project3'},
   				  { src:'flash.jpg',
   				    projectName:'Flash Deals',
   				    projectInfo:'Info for Flash Deals...',
   				  	title:'Pic 4',
   				  	link:'/project4'},
   				  	{ src:'img5.png',
   				    projectName:'Jerkspot',
   				    projectInfo:'Info for Jerkspot...',
   				  	title:'Pic 5',
   				  	link:'/project5'},
   				  	{ src:'img6.png',
   				    projectName:'Trash Bubby',
   				    projectInfo:'Info for Trash Buddy...',
   				  	title:'Pic 6',
   				  	link:'/project6'}
   				  ]; 
}]);