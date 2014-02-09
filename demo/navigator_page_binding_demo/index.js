 function IndexController($scope) {
	$scope.navigatorPage = 'page1.html';

	$scope.pushPage = function() {
		$scope.navigatorPage = {
			method: 'push',
			url: 'page2.html'
		}
	};

	$scope.popPage = function() {
		$scope.navigatorPage = {
			method: 'pop'
		}
	};
 }