(function(angular){
  "use strict";
  var tplString = "<form><label for='offenderName'>Offender Name:</label>"+
                  "<input/></form>"
  angular
    .module('xyzcorpForms', [])
    .directive('xyzcorpExampleForm', function() {
      return {
        template: tplString
      }
    });

})(angular);
