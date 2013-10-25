/*===================================================================
Musiclist
===================================================================*/
(function() {

	var app = angular.module('myApp');

	app.controller('musiclistController', ['$scope', '$rootScope', 'Data',
		function($scope, $rootScope, Data) {

			$scope.playlist = Data.selectedPlaylist;
			$scope.playlist.next().then(function(tracks){
				$scope.$apply(function(){
					$scope.musics = tracks;
				});
			});

			$scope.playMusic = function(music, index) {
				var selectedMusic = music;
				Data.selectedMusic = selectedMusic;
				Data.selectedMusicIndex = index + 1;
				Data.selectedMusicSum = $scope.musics.length;
				Data.selectedMusicList = $scope.musics;
				Data.showMusicNumber = Data.selectedMusicIndex + '/' + $scope.musics.length;

				$rootScope.$broadcast('music-detail', selectedMusic);
				$scope.ons.navigator.pushPage('pages/music/detail.html', Data.showMusicNumber);
			}
			
		}

	]);
})();