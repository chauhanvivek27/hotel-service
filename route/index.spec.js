const request = require("supertest");
const { schema } = require("../util/util");
const app = require("../lib/app");

jest.mock("./../src", () => ({
  getSearchResult: jest.fn(),
}));

jest.mock("./../src", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getSearchResult: async () =>
        new Promise((resolve) => {
          resolve({});
        }),
    };
  });
});

describe("API Routes", () => {
  it("Resolves get Hotel list request", (done) => {
    request(app.listen())
      .get("/gethotels")
      .query({ city: "dubai" })
      .expect(200)
      .end((err, res) => {
        if (err) return done.fail(err);
        expect(JSON.parse(res.text)).toEqual({});
        done();
      });
  });
  it("Resolves get Hotel list request send wrong params", (done) => {
    request(app.listen())
      .get("/gethotels")
      .query({ pricerange: "dubai" })
      .expect(500)
      .end((err, res) => {
        if (err) return done.fail(err);
        expect(JSON.parse(res.text).status).toEqual(500);
        done();
      });
  });
});
