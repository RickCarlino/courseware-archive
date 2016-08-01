
angular
.module("app", [])






.controller("MainCtrl", function($scope, Timer) {
  // Dictionary to hold timer + result status.
  $scope.timers = {
    //   "TIMER_NAME_HERE": "TIMER_STATUS_HERE"
  };

  $scope.addTimer = function(name, time) {
    // Set the status to 'pending...' while we wait.
    $scope.timers[name] = "pending..."

    Timer.start(name, time) // Started
         .then(timerOK)     // Timer finished.
         .catch(timerErr)   // Timer cancelled by user.

    function timerOK(result) {
      // Change the status to whatever was resolve()ed
      $scope.timers[name] = result
    }

    function timerErr(reason) {
      // Change the status to whatever was reject()ed
      $scope.timers[name] = reason;
    }

  }

  // Extra functionality to cancel a timer.
  // Not promise related, but required for the example.
  $scope.removeTimer = function(name){ Timer.stop(name) };

})







.factory("Timer", function($timeout, $q) {
  // Cache all timers in system.
  // Allows cancelation later.
  var names = {};
  // Empty object.
  // This will become our factory provider.
  var Timer = {};

  // Stop a timer by name.
  Timer.stop = function(name) {
    clearTimeout(names[name].id);
    names[name].deferred.reject("Aborted")
    delete names[name];
  };

  // Start a timer. Returns promise.
  Timer.start = function(name, delay) {
    var deferred = $q.defer();
    names[name] = {};
    names[name].deferred = deferred
    names[name].id = setTimeout(function() {
      var result = "Resolved " + name + " after " + delay + " ms";
      deferred.resolve(result);
      delete names[name];
    }, delay);
    return deferred.promise;
  };

  return Timer;
})