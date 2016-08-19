// This is an example app.
// For simplicity, we've placed it in the same
// file as the tests.
angular
  .module("myApp", [])
  .controller("calcCtrl", function($scope) {
    this.foo = "BAR";
    $scope.bar = "baz";

    $scope.$watch("bar", function() {
      console.log("Value of bar changed;");
    });

    $scope.add = function(a,b) {
      return a + b;
    }
  })
  .factory("userDao", function(){
    return {
      newUser: function(name) {
        return {
          name: name
        }
      }
    }
  })





describe("my controller", function() {
  var myScope, myCtrl;

  beforeEach(function() {
    module("myApp");
    // Call injector to set up variables under test.
    inject(function($rootScope, $controller) {
      myScope = $rootScope.$new();
      myCtrl = $controller("calcCtrl", {
        $scope: myScope
      });
    });
  });


  it("does addition", function(){
    var result = myScope.add(2,2);
    expect(result).toEqual(4);
    myScope.baz = "Something else";
    myScope.$apply();
    expect(myCtrl.foo).toEqual("BAR");
  });

});









describe("ng-mocks example", function() {
  // Hoist the variable to the top of the tests for easy access.
  var userDao;

  beforeEach(function() {

    // Configure the injector to use `myApp` module.
    module("myApp");
    // Call injector to set up variables under test.
    inject(function(_userDao_) {
      userDao = _userDao_;
    });
  });


  xit("creates a new user instance", function(){
    // var newUser = dao.newUser("Rick");
    // expect(newUser.name).toEqual("Rick");
  });

});
























