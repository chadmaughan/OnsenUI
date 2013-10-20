(function() {

	var app = angular.module('myApp');
	app.controller('HomeNavigator', ['$scope', '$timeout', 'Data',
		function($scope, $timeout, Data) {

			$scope.$on('hide:toolbar', function() {
				$scope.ons.navigator.setToolbarVisibility(false);
				$scope.bg = "";
			});

			$scope.$on('music-detail', function(event, music) {
				$scope.ons.navigator.pushPage('music/detail.html', 'Detail');
				$timeout(function() {
					$scope.ons.navigator.setToolbarVisibility(true);
				}, 0);

				$scope.bg = music.album_image;
			});
		}
	]);
})();