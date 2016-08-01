describe("addition", function() {
  it("adds 2 and 2", function() {
    var result = add(2, 3);
    expect(result).toEqual(5);
  })


  it("adds 3 and 4", function() {
    var result = add(3, 4);
    expect(result).toEqual(7);
  })
});
