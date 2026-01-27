const myFunctions = require("./sample-functions.js");
describe("div()", () => {
  test("divides two positive numbers", () => {
    expect(myFunctions.div(10, 2)).toBe(5);
  });

  test("divides and returns decimal", () => {
    expect(myFunctions.div(1, 2)).toBe(0.5);
  });

  test("divides negatives", () => {
    expect(myFunctions.div(-9, 3)).toBe(-3);
  });

  test("dividing by 0", () => {
    expect(myFunctions.div(5, 0)).toBe(Infinity);
  });

  test("0 divided by 5", () => {
    expect(myFunctions.div(0, 5)).toBe(0);
  });
});

describe("containsNumbers()", () => {
  test("false for empty string", () => {
    expect(myFunctions.containsNumbers("")).toBe(false);
  });

  test("false for letters only", () => {
    expect(myFunctions.containsNumbers("hello")).toBe(false);
  });

  test("true if string contains a digit", () => {
    expect(myFunctions.containsNumbers("a1c")).toBe(true);
  });

  test("true if string is just a digit", () => {
    expect(myFunctions.containsNumbers("7")).toBe(true);
  });

  test("false for spaces only", () => {
    expect(myFunctions.containsNumbers("   ")).toBe(false);
  });

  test("false for tabs/newlines only", () => {
    expect(myFunctions.containsNumbers("\t\n")).toBe(false);
  });

  test("false for punctuation only", () => {
    expect(myFunctions.containsNumbers("!!!")).toBe(false);
  });
});
