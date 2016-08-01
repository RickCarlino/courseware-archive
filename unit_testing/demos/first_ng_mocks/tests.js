// This is an example app. For simplicity, we've placed it in the same
// file as the tests.
angular
  .module("myApp", [])
  .factory("userDao", function(){
    return {
      newUser: function(name) {
        return {
          name: name
        }
      }
    }
  })





describe("ng-mocks example", function() {
  // Hoist the variable to the top of the tests for easy access.
  var dao;

  beforeEach(function() {

    // Configure the injector to use `myApp` module.
    module("myApp");
    // Call injector to set up variables under test.
    inject(function(userDao) {
      dao = userDao;
      debugger;
    });
  });


  it("creates a new user instance", function(){
    // expect(dao.newUser).toBeDefined();
    var ddao = dao;
  });

});
























