(function() {

	var app = angular.module('myApp');

	app.controller('PlaylistController', ['$scope', 'Data',
		function($scope, Data) {

			init();

			function init() {
				$scope.query = {
					text: ''
				};

				$scope.playlists = Data.playlists;
			}

			$scope.addNewPlaylistField = function() {
				$scope.newPlaylistField = true;
			}
			$scope.addPlaylist = function(newPlaylistName) {

				var playlistJson = localStorage.getItem("playlist");
				var playlistData = JSON.parse(playlistJson);

				var newPlaylist = new Object();
				newPlaylist.id = playlistData.length;
				newPlaylist.name = newPlaylistName;

				playlistData[playlistData.length] = newPlaylist;

				$scope.playlists = playlistData;

				localStorage.setItem("playlist", JSON.stringify(playlistData));
				$scope.newPlaylistField = false;
			}

			$scope.showDetail = function(playlist) {
				var selectedPlaylist = playlist;
				Data.selectedPlaylist = selectedPlaylist;
				Data.type = "playlist";
				$scope.ons.navigator.pushPage('music/list.html', playlist.name);
			}


		}
	]);
})();