(function(document) {
    var Player = function(src) {
        Player.AUDIO_UNKOWN = 0;
        Player.AUDIO_STARTING = 1;
        Player.AUDIO_RUNNING = 2;
        Player.AUDIO_PAUSED = 3;
        Player.AUDIO_ENDED = 4;

        this.src = src;
        this.audio = document.createElement('audio');
        this.audio.src = this.src;
        this.status = Player.AUDIO_UNKOWN;

        this.audio.addEventListener('play', function(){
            this.status = Player.AUDIO_RUNNING;
        });

        this.audio.addEventListener('pause', function(){
            this.status = Player.AUDIO_PAUSED;
        });

        this.audio.addEventListener('ended', function(){
            this.status = Player.AUDIO_ENDED;
        });

        this.play = function() {
            this.audio.play();
            this.status = Player.STARTING;
        };

        this.pause = function() {
            if (!this.audio.paused) {
                this.audio.pause();
            }
        };


        this.setVolume = function(volume){
            if(volume < 0 || volume > 1){
                throw new Error('IndexSizeError: Index or size was negative, or greater than the allowed value.');
            }
            this.audio.volume = volume;
        };
    };

    window.AudioPlayer = Player;
})(document);