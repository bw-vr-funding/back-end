const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeEach(async () => {
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

describe("GET /projects", () => {
  it("returns 401 Unauthorized w/out token", async () => {
    await request(server).get("/projects").expect(401);
  });
  it("returns 200 OK w/ token", async () => {
    await request(server)
      .post("/auth/register")
      .send({ username: "test", password: "projects" })
      .then(async () => {
        await request(server)
          .post("/auth/login")
          .send({ username: "test", password: "projects" })
          .then(async (res) => {
            const token = res.body.token;
            await request(server)
              .get("/projects")
              .set("Authorization", token)
              .expect(200);
          });
      });
  });
});
