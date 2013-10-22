/*===================================================================
Play Music
===================================================================*/

(function() {

    var app = angular.module('myApp');

    app.controller('musicPlayController', ['$scope', '$rootScope', 'Data', 'Player',
        function($scope, $rootScope, Data, Player) {

            $scope.volume = 50;
            $scope.player = Player;
            $scope.music = Data.selectedMusic;

            $scope.ons.tabbar.setTabbarVisibility(false);

            $scope.$on('$destroy', function(){
                $rootScope.$broadcast('exit-detail');
                $scope.ons.tabbar.setTabbarVisibility(true);
            });

            $scope.playOrPause = function(src) {
                console.log('play or pause');
                if (Player.status === Player.MEDIA_STARTING || Player.status === Player.MEDIA_RUNNING) {
                    Player.pause();
                } else {
                    Player.play(src, $scope);
                    setTimeout(function() {
                        Player.setVolume($scope.volume);
                    }, 0);
                }
            };

            $scope.dragDown = function() {
                if ($scope.volume > 0) {
                    $scope.volume--;
                    setTimeout(function() {
                        Player.setVolume($scope.volume);
                    }, 0);

                }
            };

            $scope.dragUp = function() {
                if ($scope.volume < 100) {
                    $scope.volume++;
                    setTimeout(function() {
                        Player.setMusicVolume($scope.volume);
                    }, 0);
                }
            };            

        }
    ]);
})();