 function IndexController($scope) {
	$scope.page = "page1.html";

	$scope.goPage2 = function() {

		$scope.page = {
			method: 'present',
			url: 'page2.html'
		};

	};

	$scope.dismiss = function() {
		$scope.page = {
			method: 'dismiss'
		};
	};
 }