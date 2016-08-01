// This is an example app. For simplicity, we've placed it in the same
// file as the tests.
angular
  .module("myApp", [])
  .controller("myController", function($scope){
    $scope.exampleProperty = "This is a scope property";
  });

// We will also be testing an 'otherModule' to show how multiple modules can be
// tested.
angular
  .module("otherModule", [])
  .controller("otherController", function($scope){
    $scope.otherProperty = "This was defined in `otherModule`";
  });


describe("ng-mocks example", function() {
  // Hoist the variable to the top of the tests for easy access.
  var controller1, scope1;

  beforeEach(function() {

    // Configure the injector to use `myApp` module.
    module("myApp", "otherModule");
    // Call injector to set up variables under test.
    inject(function($controller, $rootScope) {
      // Make dummy scope objects to do assertions off of.
      scope1 = $rootScope.$new();
      scope2 = $rootScope.$new();
      // Run the scope object through the controller function we wrote
      // on line 1.
      controller1 = $controller('myController', {$scope: scope1});
      controller2 = $controller('otherController', {$scope: scope2});
    });
  });


  it("accesses controller $scope attributes", function(){
    var property1 = scope1.exampleProperty;
    var property2 = scope2.otherProperty;
    expect(property1).toEqual("This is a scope property");
    expect(property2).toEqual("This was defined in `otherModule`");
  });

});
