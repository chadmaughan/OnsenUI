(function(){

  var UNKNOWN = 0;
  var RIGHT = 1;
  var CENTER = 2;
  var LEFT = 3;

  var Animator = Class.extend({
    init: function(el){
      this.el = el;
      this.location = UNKNOWN;
    },

    toRight: function(cb){
      var animationEndCallback = function() {
        this.el.classList.remove('leave');
        this.el.classList.remove('leave-active');
        if(cb){
          cb();
        }
      }.bind(this);
      this.el.addEventListener('webkitTransitionEnd', animationEndCallback);
      this.el.addEventListener('transitionEnd', animationEndCallback);

      this.el.classList.remove('ons-center'); 
      this.el.classList.add('ons-right');
      this.location = RIGHT;
    },

    toCenter: function(){      
      switch( this.location ){
        case UNKNOWN :
            this.el.classList.add('ons-right');  
            setTimeout(function(){
              this.el.classList.remove('ons-right'); 
              this.el.classList.add('ons-center'); 
            }.bind(this), 10);              
            break;

        case RIGHT:
            this.el.classList.remove('ons-right'); 
            this.el.classList.add('ons-center'); 
            break;

        case LEFT:
            this.el.classList.remove('ons-left'); 
            this.el.classList.add('ons-center'); 
            break; 
      }    

      this.location = CENTER;
    },

    toLeft: function(){
      this.el.classList.remove('ons-center');
      this.el.classList.add('ons-left');
      this.location = LEFT;
    }
  });

  window.ons = window.ons || {};  
  window.ons.Animator = Animator;
})();
