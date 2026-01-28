const portfolio = require("./portfolio.js");

beforeEach(() => {
  portfolio.reset();
});
test("new portfolio has empty number of shares", () => {
  expect(portfolio.shares("LEGO")).toBe(0);
});

test("portfolio is empty", () => {
  expect(portfolio.isEmpty()).toBe(true);
});

test("buying shares should update portfolio", () => {
  portfolio.buy("Apple", 20);
  expect(portfolio.shares("Apple")).toBe(20);
});

test("making a sale updates porfolio", () => {
  portfolio.buy("Google", 11);
  portfolio.sell("Google", 3);
  expect(portfolio.shares("Google")).toBe(8);
});

test("count of unique ticker symbols", () => {
  portfolio.buy("RBLX", 20);
  portfolio.buy("GMR", 3);
  expect(portfolio.tickerCount()).toBe(2);
});

test("stock with 0 shares should not be in portfolio", () => {
  portfolio.buy("RBLX", 3);
  portfolio.buy("GMR", 4);
  portfolio.sell("RBLX", 3);
  expect(portfolio.tickerCount()).toBe(1);
});

test("if symbol not in portfolio, return 0", () => {
  expect(portfolio.shares("AABB")).toBe(0);
});

test("cannot sell more than owned", () => {
  portfolio.buy("RBLX", 2);
  expect(() => {
    portfolio.sell("RBLX", 3);
  }).toThrow("Not possible to sell this number of shares.");
});

// Yes I was able to follow the test-first approach going over the red-green-refactor cycle. I was able to
// accommodate the tests first and then create functions that were able to satisfy it in order to receive
// green. Then throughout later tests, the refactoring process came in. Modifying, previous functions in order
// to satisfy the next increments. This assignment was pretty fun, it helped me see how there is a huge variety
// of edge cases that emerge when in the process of creating something such as an app, although this was just
// a mockup I know there is much more that can be expanded upon. Ultimately, TDD helped me make sure that the
// code still works as you progress more. As you add new requirements, some old behaviors are already tested
// in which they just build upon each other.
