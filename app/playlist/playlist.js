(function() {

	var app = angular.module('myApp');

	app.controller('PlaylistController', ['$scope', 'Data',
		function($scope, Data) {

			init();

			function init() {
				$scope.query = {
					text: ''
				};

				var playlistData = localStorage.getItem("playlist");
				var playlistJson = JSON.parse(playlistData);

				if (playlistJson) {
					$scope.playlists = playlistJson;
				} else {
					var myFavorite = new Object();
					myFavorite.id = 1;
					myFavorite.name = "MyFavorite";

					var myPlaylists = new Array();
					myPlaylists[0] = myFavorite;

					$scope.playlists = myPlaylists;
					localStorage.setItem("playlist", JSON.stringify(myPlaylists));
				}
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