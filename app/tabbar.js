(function() {

	var app = angular.module('myApp');
	app.controller('TabbarController', ['$scope', '$rootScope', 'Data',
		function($scope, $rootScope, Data) {
			// $rootScope.$broadcast('hide:toolbar');
			$scope.$on('music-detail', function(event, music){
				$scope.bg = music.album_image;    
			});

			$scope.$on('exit-detail', function(){
				$scope.bg = "";
			});
		}
	]);
})();