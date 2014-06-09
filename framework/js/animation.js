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

  function animate(element) {
    return {
      leave: function(cb) {
        var animationEndCallback = function() {
          element.classList.remove('leave');
          element.classList.remove('leave-active');

          element.removeEventListener('webkitTransitionEnd', animationEndCallback);
          element.removeEventListener('transitionEnd', animationEndCallback);
          if(cb){
            cb();
          }
        };

        element.addEventListener('webkitTransitionEnd', animationEndCallback);
        element.addEventListener('transitionEnd', animationEndCallback);

        element.classList.add('leave');
        setTimeout(function(){
          element.classList.add('leave-active');
        }.bind(this), 10);        
        
        return this;
      },
      enter: function() {
        var animationEndCallback = function() {

          console.log('animation end');
          element.classList.remove('enter');
          element.classList.remove('enter-active');

          element.removeEventListener('webkitTransitionEnd', animationEndCallback);
          element.removeEventListener('transitionEnd', animationEndCallback);
        };
        element.addEventListener('webkitTransitionEnd', animationEndCallback);
        element.addEventListener('transitionEnd', animationEndCallback);

        element.classList.add('enter');
        setTimeout(function(){
          element.classList.add('enter-active');
        }.bind(this), 10);
        
        return this;
      }
    };
  }

  window.ons = window.ons || {};
  window.ons.animate = animate;
  window.ons.Animator = Animator;
})();
