angular
  .module("app", ['ui.bootstrap'])
  .controller("controller", function($scope){
    $scope.totalItems = 64;
    $scope.currentPage = 4;
  })
