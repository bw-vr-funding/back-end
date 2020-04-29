const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("projects").truncate();
  await db("users").truncate();
});

describe("auth-router.js", () => {
  describe("POST /auth/register", () => {
    it("returns 201 created", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "user", password: "created" })
        .expect(201);
    });
  });
  describe("POST /auth/login", () => {
    it("returns 401 Unauthorized w/out right credentials", async () => {
      await request(server)
        .post("/auth/login")
        .send({ username: "wrong", password: "credentials" })
        .expect(401);
    });
    it("returns 200 OK w/ right credentials", async () => {
      await request(server)
        .post("/auth/register")
        .send({ username: "right", password: "credentials" })
        .then(async () => {
          await request(server)
            .post("/auth/login")
            .send({ username: "right", password: "credentials" })
            .expect(200);
        });
    });
  });
});
