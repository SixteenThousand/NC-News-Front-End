// tests for all utils functions
const imports = Promise.all([
  import("node:test"),
  import("./utils.js"),
  import("node:assert/strict"),
]);


imports.then(([t, utils, assert]) => {
  t.describe("formatDate", () => {
    t.test("returns a string in the correct format", () => {
      const date = 1234567890;
      const result = utils.formatDate(date);
      assert.equal(typeof(result),"string");
      assert.match(result, /\d{4}-\d{2}-\d{2}/);
    });
  });
});
