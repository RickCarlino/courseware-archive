(function(angular){
  'use strict';

  angular
    .module('xyzcorpApp', ['xyzcorpForms'])
    .controller('main', function($scope) {
      $scope.greeting = 'Hello, xyzcorp!'
    });

})(angular);
