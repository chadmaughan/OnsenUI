 function IndexController($scope) {
	$scope.page = 'page1.html'

	$scope.goPage2 = function() {

		$scope.page = 'page2.html'

	};

	$scope.dismiss = function() {
		$scope.page = 'page1.html'
	};
 }