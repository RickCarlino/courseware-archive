(function(angular){
  "use strict";

  angular
    .module('xyzcorpForms', [])
    .service('DataValidator', function() {
      this.validateFields = function(data) {
        // 20 lines of business logic.
        return true;
      };
    })
    .directive('xyzcorpExampleForm', function() {
      return {
        template: "<form><label for='customerName'>Customer Name:</label>"+
                  "<input/></form>"
      }
    });

})(angular);
