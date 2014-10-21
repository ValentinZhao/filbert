var util = require('./util.js');

// NOTE: Be careful with indentation when using multiline strings

describe("Errors", function () {

  it("Indent error while block", function () {
    var code = "\
while True:\n\
break\n\
    ";
    var error;
    try {
      util.parse(code);
    } catch (e) {
      error = e;
    }
    expect(error.message).toEqual("Unexpected indent");
    expect(error.pos).toEqual(12);
    expect(error.loc).toEqual({line: 2, column: 0});
  });

  it("Indent error if block", function () {
    var code = "\
if True:\n\
x = 5\n\
    ";
    var error;
    try {
      util.parse(code);
    } catch (e) {
      error = e;
    }
    expect(error.message).toBe("Unexpected indent");
    expect(error.pos).toEqual(9);
    expect(error.loc).toEqual({line: 2, column: 0});
  });

  it("Indent error within if block", function () {
    var code = "\
if True:\n\
  x = 5\n\
    x = 5\n\
    ";
    var error;
    try {
      util.parse(code);
    } catch (e) {
      error = e;
    }
    expect(error.message).toBe("Unexpected indent");
    expect(error.pos).toEqual(19);
    expect(error.loc).toEqual({line: 3, column: 2});
  });

});