angular
  .module("myApp", [])
  .controller("myCtrl", function($scope){ })
  .directive("checkList", function(){
    return {
      transclude: true,
      template: "<div ng-transclude></div>",
      link: function(scope, elem, attr) {
        var strikeOut = function(e){ elem.toggleClass('strikethru'); };
        elem.on("click", strikeOut);
      }
    }
  });
