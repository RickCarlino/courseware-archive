var API_URL = 'http://jsonplaceholder.typicode.com/users';

angular
  .module("myApp", ["ngResource"])
  .factory("Employee", function($resource) {
    return $resource(API_URL + '/:id', {id: '@id'});
  });

describe("Employee service", function() {
  var Employee, $httpBackend;

  beforeEach(function() {
    module("myApp");
    inject(function(_Employee_, _$httpBackend_) {
      Employee = _Employee_;
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(function(){
    // WHY PASS FALSE HERE? Calls to .flush() trigger a digest. So do calls to
    // verifyNoOutstandingExpectation. Calling a digest in the middle of a
    // digest will raise an exception. We can get around that by passing
    // `false`.
    $httpBackend.verifyNoOutstandingExpectation(false);
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("creates users", function(done){
    var rick = new Employee();

    $httpBackend
      .expectPOST(API_URL)
      .respond({name: "Rick Carlino"});

    rick
      .$save()
      .then(function(user) {
        debugger;
        expect(user.name).toEqual("Rick Carlino");
        done();
      });

    $httpBackend.flush();

  });

  it("fetches users", function(done){
    var fakeCollection = [
      {id: 1},
      {id: 2}
    ];

    $httpBackend.when('GET', API_URL).respond(fakeCollection);

    var promise = Employee.query().$promise;

    promise.then(function(users){
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(1);
      done();
    });

    $httpBackend.flush();
  });


});
