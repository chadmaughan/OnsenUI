(function(){

  function animate(element) {
    return {
      leave: function() {
        var animationEndCallback = function() {
          element.classList.remove('leave');
          element.classList.remove('leave-active');

          element.removeEventListener('webkitTransitionEnd', animationEndCallback);
          element.removeEventListener('transitionEnd', animationEndCallback);
        };

        element.addEventListener('webkitTransitionEnd', animationEndCallback);
        element.addEventListener('transitionEnd', animationEndCallback);

        element.classList.add('leave');
        element.classList.add('leave-active');
        return this;
      },
      enter: function() {
        var animationEndCallback = function() {

          element.classList.remove('enter');
          element.classList.remove('enter-active');

          element.removeEventListener('webkitTransitionEnd', animationEndCallback);
          element.removeEventListener('transitionEnd', animationEndCallback);
        };
        element.addEventListener('webkitTransitionEnd', animationEndCallback);
        element.addEventListener('transitionEnd', animationEndCallback);

        element.classList.add('enter');
        element.classList.add('enter-active');

        return this;
      }
    };
  }

  window.onsen = window.onsen || {};
  window.onsen.animate = animate;
})();
