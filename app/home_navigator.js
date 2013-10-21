(function() {

	var app = angular.module('myApp');
	app.controller('HomeNavigator', ['$scope', '$timeout', 'Data',
		function($scope, $timeout, Data) {

			$scope.$on('hide:toolbar', function() {
                $scope.ons.navigator.setToolbarVisibility(false);
                $timeout(function() {				    
				    $scope.bg = "";
                }, 300);
			});

			$scope.$on('music-detail', function(event, music) {
				$scope.ons.navigator.pushPage('music/detail.html', 'Detail');
				$timeout(function() {
					$scope.ons.navigator.setToolbarVisibility(true);
				}, 200);

                $timeout(function(){
                    $scope.bg = music.album_image;    
                }, 200);
				
			});
		}
	]);
})();