/*===================================================================
Play Music
===================================================================*/

(function() {

    var app = angular.module('myApp');

    app.controller('musicPlayController', ['$scope', 'Data', 'Player',
        function($scope, Data, Player) {

            $scope.volume = 95;
            $scope.player = Player;
            $scope.music = Data.selectedMusic;

            $scope.playOrPause = function(src) {
                if (Player.isPlaying()) {
                    Player.pause();
                } else {
                    Player.play(src);
                }
            };

            $scope.dragDown = function() {
                if ($scope.volume > 0) {
                    $scope.volume--;
                    setTimeout(function() {
                        setMusicVolume($scope.volume);
                    }, 0);

                }
            };

            $scope.dragUp = function() {
                if ($scope.volume < 100) {
                    $scope.volume++;
                    setTimeout(function() {
                        setMusicVolume($scope.volume);
                    }, 0);
                }
            };

            // music volume
            var setMusicVolume = function(vl) {
                vl = vl / 100;
                if (Data.my_media) {
                    Data.my_media.setVolume(vl);
                }
            };

        }
    ]);
})();