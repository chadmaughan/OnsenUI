/*===================================================================
Play Music
===================================================================*/

(function() {

    var app = angular.module('myApp');

    app.controller('musicPlayController', ['$scope', '$rootScope', 'Data', 'Player',
        function($scope, $rootScope, Data, Player) {

            $scope.volume = 95;
            $scope.player = Player;
            $scope.music = Data.selectedMusic;

            $scope.ons.tabbar.setTabbarVisibility(false);

            $scope.$on('$destroy', function(){
                $rootScope.$broadcast('exit-detail');
                $scope.ons.tabbar.setTabbarVisibility(true);
            });

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