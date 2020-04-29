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

describe('GET /projects/category/:category', () => {
 it('returns 401 without token', async() => {
   await request(server).get('/projects/category/game')
   .expect(401)
 });
 it('returns 200 with valid token', async () => {
   await request(server)
    .post('/auth/register')
    .send({username: 'test', password: 'projects'})
    .then(async () => {
      await request(server)
        .post('/auth/login')
        .send({username: 'test', password: 'projects'})
        .then(async (res) => {
          const token = res.body.token;
          await request(server)
          .get('/projects')
          .set('Authorization', token)
          .then(response => {
            expect(200)
          })
        })
    })
 })
});