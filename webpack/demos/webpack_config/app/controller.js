var module = require("./module.js");

function Controller ($scope) {
  $scope.greeting = "Hello, world!";
}

Controller.$inject = ["$scope"];

module.exports = module.controller("Controller", Controller);
