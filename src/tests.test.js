// tests for all utils functions
const imports = Promise.all([
  import("node:test"),
  import("./utils.js"),
  import("node:assert/strict"),
]);


imports.then(([t, utils, assert]) => {
  t.describe("formatDate", () => {
    const examples = [
      "2000-02-15T14:00:00.890Z",
      "2013-12-30T08:02:10.890Z",
      "2000-02-15T21:09:43.890Z",
      "1993-10-07T20:47:47.890Z",
      "1993-10-07T20:47:47.890Z",
    ];
    t.test("returns a string in the correct format", () => {
      let result;
      examples.forEach((dateStr) => {
        result = utils.formatDate(Number(new Date(dateStr)));
        assert.equal(typeof(result),"string");
        assert.match(result, /\d{4}-\d{2}-\d{2}/);
      });
    });
    t.test("returns the correct date", () => {
      let result;
      examples.forEach((dateStr) => {
        result = utils.formatDate(Number(new Date(dateStr)));
        assert.equal(result,dateStr.slice(0,10));
      });
    });
    t.test("when passed a second argument equal to true, also adds the time" +
      "in YYYY-MM-DD HH:MM format",
      () => {
        let result;
        examples.forEach((dateStr) => {
          result = utils.formatDate(Number(new Date(dateStr)), true);
          assert.match(result,/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/);
        });
      }
    );
  });
  
  t.describe("utils.compareByKey", () => {
    const a = {
      name: "Steve",
      species: "Salmon",
      age: 37,
      fav_ocean: "atlantic",
    };
    const b = {
      name: "Tanisha",
      age: 27,
      fav_ocean: "atlantic",
    };
    t.test("is pure", () => {
      const aCopy = structuredClone(a);
      const bCopy = structuredClone(b);
      utils.compareByKey("name")(a,b);
      assert.deepEqual(a, aCopy);
      assert.deepEqual(b, bCopy);
    });
    t.test("compares two objects by the specified key", () => {
      assert.equal(Math.sign(utils.compareByKey("name")(a,b)), -1);
      assert.equal(Math.sign(utils.compareByKey("age")(a,b)), 1);
      assert.equal(Math.sign(utils.compareByKey("fav_ocean")(a,b)), 0);
    });
  });
});
