const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("projects").truncate();
  await db("users").truncate();
});

describe("server.js", () => {
  it("sanity check", () => {
    expect(5).toBe(5);
  });

  describe("GET /", () => {
    it("returns 200 OK", async () => {
      await request(server).get("/").expect(200);
    });
    it("returns {api: 'is up'}", async () => {
      await request(server)
        .get("/")
        .then((res) => {
          expect(res.body).toEqual({ api: "is up" });
        });
    });
  });
});
