function HomeNavigator($scope) {

	$scope.$on('hide:toolbar', function() {
		$scope.ons.navigator.setToolbarVisibility(false);
	});

	$scope.$on('show-detail', function() {
		$scope.ons.navigator.pushPage('music/detail.html', 'Detail');
		$scope.ons.navigator.setToolbarVisibility(true);
	});
}