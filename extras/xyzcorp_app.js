(function(angular){
  'use strict';

  angular
    .module('xyzcorpApp', ['xyzcorpForms'])
    .controller('main', function($scope, DataValidator) {
      // DataValidator service is
      // defined outside of main app.
      $scope.isValid = DataValidator.validateFields("foo");
      $scope.greeting = 'Hello, xyzcorp!'
    });

})(angular);
