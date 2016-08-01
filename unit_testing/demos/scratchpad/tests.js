describe("my feature", function(){
  var testUser
  beforeEach(function(){
    // Will be run before each 'it' block.
    testUser = userDAO.newUser();
  });

  it("is defined", function(done) {
    userDAO
      .fetchUser(123)
      .then((usr) => { // {id: 123, name: "Rick"}
        expect(usr).toBeDefined();
        done();
      });
  })

  it("is defined", function() {
    testUser
  })

  it("is defined", function() {
    testUser
  })
});








// angular.module("second", []).value("foo", 34);
// angular.module("first", ["second"]).value("bar", 12);

// describe("ng-mocks example", function() {

//   beforeEach(function() {

//     // Configure the injector to use `myApp` module.
//     // module("second");
//     module("first");
//     inject(function($httpBackend) {
//       $httpBackend.expect('post', '/my_form', 'example content').respond(201, '');
//     });
//   });

//   afterEach(function(){
//     inject(function($httpBackend) {
//       $httpBackend.verifyNoOutstandingExpectation();
//       $httpBackend.flush()
//     });
//   });


//   it("stubs", function(){
//     expect(1).toEqual(1);
//   });

// });
