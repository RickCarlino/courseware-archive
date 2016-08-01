// Send a message down to child scopes
$scope.$broadcast("messageName", messageObject);
// Send a message up to parent scopes
$scope.$emit("messageName", messageObject);
// React to an event that was sent to YOU, the current scope.
// Responding to events is optional
$scope.$on("messageName", function (eventData, messageObject) {
  // body...
});
