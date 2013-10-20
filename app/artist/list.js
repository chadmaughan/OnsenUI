/*===================================================================
Artist List
===================================================================*/

(function() {

    var app = angular.module('myApp');

    app.controller('artistListController', ['$scope', 'Data',
        function($scope, Data) {



            init();

            function init() {
                var artistMusics = new Array();
                var playlists = JSON.parse(localStorage.getItem("playlist"));

                if (playlists) {
                    for (var playlistCount = 0; playlistCount < playlists.length; playlistCount++) {
                        var playlistMusics = JSON.parse(localStorage.getItem(playlists[playlistCount].name));

                        if (playlistMusics) {
                            for (var musicCount = 0; musicCount < playlistMusics.length; musicCount++) {
                                artistMusics.push(playlistMusics[musicCount]);
                            }
                        }
                    }
                }
                $scope.artistList = artistMusics;
            }

            $scope.showDetail = function(artist) {
                var selectedArtist = artist;
                Data.selectedArtist = selectedArtist;
                Data.type = "Artist";
                $scope.ons.navigator.pushPage('music/list.html', artist.artist_name);
            }

        }
    ]);
})();