(function(){
	var myApp = angular.module('myApp', ['onsen']);

	myApp.controller('MyController', function($scope){
		$scope.isLoading = true;

		$scope.toggle = function(){
			$scope.isLoading = !$scope.isLoading;
		}
	});

	myApp.controller('Page2Controller', function($scope){
		$scope.binding = 'Page 2';

		$scope.change = function(){
			$scope.binding = "new value here!";
		};
	});

	myApp.controller('Page3Controller', function($scope){
		$scope.icon = 'fa-twitter';
		$scope.title = "Page 3";

		$scope.twitter = function(){
			alert('twitter!');
		}

		$scope.facebook = function(){
			alert('facebook!');
		}

		$scope.changeTitle = function(){
			$scope.title = 'New title';
		}
	});
})();
