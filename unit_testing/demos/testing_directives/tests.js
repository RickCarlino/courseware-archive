describe("testing a directive", function() {
  var scope, $compile;

  beforeEach(function() {
    module("myApp");

    inject(function($rootScope, _$compile_) {
      scope = $rootScope.$new();
      $compile = _$compile_;
    });
  });















  it("tests click events", function(){
    var elem = $compile("<check-list>Buy eggs</check-list>")(scope);
    expect(elem.hasClass("strikethru")).toBeFalsy();
    elem.triggerHandler("click");
    // scope.$apply();
    expect(elem.hasClass("strikethru")).toBeTruthy();
    debugger;
  });

});
