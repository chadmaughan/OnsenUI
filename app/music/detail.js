/*===================================================================
Play Music
===================================================================*/

(function() {

    var app = angular.module('myApp');

    app.controller('musicPlayController', ['$scope', 'Data',
        function($scope, Data) {

            init();

            function init() {
                $scope.music = Data.selectedMusic;
                $scope.playType = "repeat";
                if (Data.nowPlay) {
                    $scope.PlayButtonText = "Stop";
                } else {
                    $scope.PlayButtonText = "Play";
                }

                $scope.playRange = 0;
                $scope.nowSec = 0;
                $scope.currentPositionFormatted = convertSec(0);
                $scope.endSec = convertSec(Data.selectedMusic.duration);

                var localPlayMode = localStorage.getItem("playMode");

                if (localPlayMode) {
                    setPlayMode(localPlayMode);
                } else {
                    setPlayMode('Repeat');
                }
            }

            function setPlayMode(mode) {
                var obj = new Object();

                if (mode === 'Repeat') {
                    $scope.playMode = 'Repeat';
                    obj.repeat = "checked";
                    obj.shuffle = "";
                } else {
                    $scope.playMode = 'Shuffle';
                    obj.repeat = "";
                    obj.shuffle = "checked";
                }

                Data.playMode = $scope.playMode;
                $scope.repeatChecked = obj.repeat;
                $scope.shuffleChecked = obj.shuffle;

                localStorage.setItem("playMode", Data.playMode);
            }

            $scope.playModeSelect = function(mode) {
                setPlayMode(mode);
            }

            $scope.pushPlay = function(src) {
                console.log(src);
                if (Data.nowPlay) {
                    pauseAudio();
                    Data.nowPlay = false;
                    Data.pause = true;
                    $scope.PlayButtonText = "Play";
                } else {
                    playAudio(src);
                    Data.nowPlay = true;
                    $scope.PlayButtonText = "Stop";
                }
            }

            $scope.pushPrevious = function() {

                if (Data.nowPlay) {
                    pauseAudio();
                }

                if (Data.selectedMusicIndex - 1 < 0) {
                    $scope.music = Data.selectedMusicList[Data.selectedMusicSum];
                    Data.selectedMusicIndex = Data.selectedMusicSum - 1;
                } else {
                    Data.selectedMusicIndex--;
                    $scope.music = Data.selectedMusicList[Data.selectedMusicIndex - 1];
                }

                if (Data.nowPlay) {
                    playAudio($scope.music.audio);
                }

                init();
            }

            $scope.pushForword = function() {

                if (Data.nowPlay) {
                    pauseAudio();
                }

                if (Data.playMode === 'Repeat') {
                    if (Data.selectedMusicIndex + 1 > Data.selectedMusicSum) {
                        $scope.music = Data.selectedMusicList[0];
                        Data.selectedMusicIndex = 1;
                    } else {
                        Data.selectedMusicIndex++;
                        $scope.music = Data.selectedMusicList[Data.selectedMusicIndex - 1];
                    }
                } else {
                    var randomNumber = Math.floor(Math.random() * Data.selectedMusicSum);
                    $scope.music = Data.selectedMusicList[randomNumber];
                }

                if (Data.nowPlay) {
                    playAudio($scope.music.audio);
                }

                init();
            }

            /*===================================================================
    Music Control
    ===================================================================*/

            function playAudio(src) {
                if (!Data.pause) {
                    Data.my_media = new Media(src, onSuccess, onError, mediaStatus);
                }
                Data.my_media.play();
            }

            // Pause audio

            function pauseAudio() {
                if (Data.my_media) {
                    Data.my_media.pause();
                }
            }

            // Stop audio

            function stopAudio() {
                if (Data.my_media) {
                    Data.my_media.stop();
                }
                // clearInterval(Data.mediaTimer);
                // Data.mediaTimer = null;
                
            }

            // onSuccess Callback

            function onSuccess() {
                alert('success');
                console.log("playAudio():Audio Success");
                
            }
            
            function startPlayTimer(){
                Data.playTimer = setInterval(addPlaySec, 1000);
            }
            
            function stopPlayTimer(){
                clearInterval(Data.playTimer);
            }

            // onError Callback

            function onError() {
                console.log("playMusic:::fail");
            }
            
            function mediaStatus(status){
                console.log('status:' + status);
                if(status === Media.MEDIA_RUNNING){
                    startPlayTimer();
                }else if(status === Media.MEDIA_PAUSED || status === MEDIA_STOPPED){
                    stopPlayTimer();
                }
                
                // Media.MEDIA_NONE = 0;
                // Media.MEDIA_STARTING = 1;
                // Media.MEDIA_RUNNING = 2;
                // Media.MEDIA_PAUSED = 3;
                // Media.MEDIA_STOPPED = 4;
            }

            function convertSec(sec) {
                if (sec == 0) {
                    return "0:00";
                } else {
                    var minute = Math.floor(sec / 60);
                    var second = Math.floor(sec - minute * 60);
                    return minute + ":" + second;
                }
            }

            function addPlaySec() {
                console.log('add play sec');
                Data.my_media.getCurrentPosition(
                    // success callback
                    function (position) {
                        $scope.$apply(function(){
                            $scope.currentPosition = position; 
                            $scope.currentPositionFormatted = convertSec(position);
                        });
                    },
                    // error callback
                    function (e) {
                        console.log("Error getting pos=" + e);
                    }
                );
            }

            function stopPlaySec() {
                
            }


            // music volume
            $scope.setMusicVolume = function(vl) {
                vl = vl / 100;
                if (Data.my_media) {
                    Data.my_media.setVolume(vl);
                }
            }

        }
    ]);
})();