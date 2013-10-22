(function() {
	var myApp = angular.module('myApp');

	myApp.factory('Player', function() {

		var Player = function() {
			this.media = null;
			this.currentPosition = 0;
			// if(Media){
			// 	this.status = Media.MEDIA_NONE;
			// }			

			this.play = function(src, $scope) {
				this.currentPosition = 0;
				this.scope = $scope;
				this.media = new Media(src, this.onSuccess, this.onError, $.proxy(this.onMediaStatus, this));
				this.media.play();
			};

			this.pause = function(){
				if(this.media){
					this.media.pause();
				}
			};

			this.setVolume = function(vl) {
                vl = vl / 100;
                if (this.media) {
                    this.media.setVolume(vl);
                }
            };

			this.onSuccess = function() {
				console.log('success');
			};

			this.onError = function(e) {
				console.log('error', e);
			};

			this.onMediaStatus = function(status) {
				console.log('status:' + status);
				var that = this;
				if (status === Media.MEDIA_RUNNING) {					
					this.startPlayTimer();
				} else if (status === Media.MEDIA_PAUSED || status === Media.MEDIA_STOPPED) {
					this.stopPlayTimer();
				}

				this.scope.$apply(function() {
					that.status = status;
				});

				// Media.MEDIA_NONE = 0;
				// Media.MEDIA_STARTING = 1;
				// Media.MEDIA_RUNNING = 2;
				// Media.MEDIA_PAUSED = 3;
				// Media.MEDIA_STOPPED = 4;
			};

			this.isPlaying = function(){
				if(this.status === Media.MEDIA_STARTING || this.status === Media.MEDIA_RUNNING){
					return true;
				}else{
					return false;
				}
			}

			this.startPlayTimer = function() {
				this.playTimer = setInterval($.proxy(this.updateCurrentPosition, this), 1000);
			};

			this.updateCurrentPosition = function() {
				console.log('add play sec');
				var that = this;
				this.media.getCurrentPosition(
					// success callback

					function(position) {
						that.scope.$apply(function() {
							that.currentPosition = position;
						});
					},
					// error callback

					function(e) {
						console.log("Error getting pos=" + e);
					}
				);
			};

			this.stopPlayTimer = function(){
                clearInterval(this.playTimer);
            };
		};

		return new Player();
	});
})();