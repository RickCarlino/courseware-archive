
angular
  .module("myApp", [])
  .factory("calculator", function(){
    return {
      add: function(lhand, rhand) {
        return (lhand + rhand);
      }
    }
  });


describe("calculator", function() {
  var calculator;

  beforeEach(function() {
    module("myApp");

    inject(function(_calculator_) {
      calculator = _calculator_;
    });
  });


  it("adds numbers", function(){
    expect(calculator.add).toBeDefined();
    expect(calculator.add(2, 2)).toEqual(4);
  });

});
