function HomeNavigator($scope){
	$scope.$on('show-detail', function(){
		$scope.ons.navigator.pushPage('music/detail.html', 'Detail');
		$scope.ons.navigator.setToolbarVisibility(true);
	});
}