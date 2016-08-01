angular
.module("myMod", [])
.service("Message", function($rootScope, $window) {
   $window.addEventListener("storage", function (event) {
     var data = JSON.parse(event.newValue);
     debugger;
     $rootScope.$apply(function() {
      $rootScope.$broadcast("Message", data);
    });
   });

    this.sync = function(data) {
      var payload = JSON.stringify(data);
      localStorage["TEMPORARY"] = payload;
    };

})
.controller("myCtrl", function($scope, Message, $window) {
  $scope.todos = [];

  $scope.addTodo = function() {
    $scope.todos.push({value: $scope.myTodo});
    $scope.myTodo = "";
    Message.sync($scope.todos);
  }

  $scope.$on("Message", function(ev, data) { $scope.todos = data; });
});
