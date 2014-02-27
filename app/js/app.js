(function(){
	var myApp = angular.module('myApp', ['ngTouch', 'ngAnimate', 'onsen.directives']);	

	myApp.controller('MyController', function($scope){
		$scope.isLoading = true;

		$scope.toggle = function(){
			$scope.isLoading = !$scope.isLoading;
		}
	});
})();

function MainCtrl($scope, $timeout){

	$scope.activateTab1 = function(){
		var tabbar = document.getElementsByClassName('topcoat-tab-bar');
		var tabs = tabbar[0].getElementsByTagName('button');

		var tab1 = tabs[1];

		tab1.click();

		// for(i=0; i<tabs.length; i++){
		//   console.log(i, tabs[i].checked)
		// }
	}

    // $timeout(function(){
    //     $scope.ons.screen.presentPage('page2.html');       
    // }, 1000);

}


// var app = angular.module('myApp', []);

// app.controller('MainCtrl', function($scope) {

// 	$scope.global = {};
// 	$scope.items = [{
// 		name: 'Lekhnath Rijal',
// 		address: 'Ilam, Nepal',
// 		email: 'me@gmail.com'
// 	}, {
// 		name: 'abc def',
// 		address: 'ghi, jkl',
// 		email: 'mnop@qrst.uv'
// 	}];

// 	$scope.$watch('global.text', function(text) {
// 		if (text && $scope.selectedItem) {
// 			$scope.selectedItem[$scope.selectedAttribute] = text;
// 		}
// 	});
// 	$scope.setSelectedItem = function(item, attribute) {
// 		$scope.selectedItem = item;
// 		$scope.selectedAttribute = attribute;
// 	}

// });