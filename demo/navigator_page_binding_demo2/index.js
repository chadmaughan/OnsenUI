 function IndexController($scope) {
	$scope.navigatorPage = 'page1.html';

	$scope.showPage2 = function() {
		$scope.navigatorPage = 'page2.html';
	};

	$scope.showPage1 = function() {
		$scope.navigatorPage = 'page1.html';
	};
 }