angular.module('js-height-fix', [])

.directive('jsheightfix', function($window) {

  var DELTA = 50;

  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs) {
      var Ctrl = this;

      var timeout = false, resizetime;

      $window = $($window);

      var $containerEl, $targetEl;

      var containerCls = 'js_height_container',
          fixedCls = 'js_height_fixed';

      function _resize() {
        if( (new Date()) - resizetime < DELTA ) {
          setTimeout(_resize, DELTA);
        }
        else {
          timeout = false;
          _fixHeight();
        }
      }

      function _fixHeight() {
        var fixedHeights = 0,
            remainingHeight,
            oldHeight;

        $containerEl.children('.' + fixedCls).each(function(index, el) {
          fixedHeights += $(el).height();
        });

        remainingHeight = $containerEl.height() - fixedHeights;
        oldHeight = $targetEl.height();

        if(remainingHeight !== oldHeight) {
          $targetEl.height(remainingHeight); 
        } 
      }

      $containerEl = $element.parent('.' + containerCls);
      $targetEl = $element;

      _fixHeight();

      $window.on('resize.jsheightfix', function() {
        // console.log(++counter);

        resizetime = new Date();
        if(timeout === false) {
          timeout = true;
          setTimeout(_resize, DELTA);
        }
      });
    },

    link: function($scope, $element, $attrs, Ctrl) {
      var $window = $(window);

      $scope.$on('$destroy', function() {
        $window.off('resize.jsheightfix')
      });
    }
  }

});