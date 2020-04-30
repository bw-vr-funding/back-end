const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("projects").truncate();
  await db("users").truncate();
});

const project = {
  name: "loup-garou pour une nuit",
  description: "One of the most loved french party game ever created",
  img_url:
    "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcvaksBQhrVCyZL4yvLy6WhAcg1GN9mC9tNdganvq8zKAWMIpk-QQ&usqp=CAc",
  category: "game",
  funding_goal: 200000,
  funding: 163290,
  creator_id: 1,
};

const project2 = {
  name: "vr doc",
  description: "Get diagnosed by professionals in VR",
  img_url:
    "https://frontiersinblog.files.wordpress.com/2018/08/frontiers-ai-robotics-vr-virtual-reality-child-abuse.jpg",
  category: "health",
  funding_goal: 30000,
  funding: 3290,
  creator_id: 1,
};

const id = 1;

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

describe("GET /projects/:id", () => {
  it("returns 401 Unauthorized w/out token", async () => {
    await request(server).get("/projects/1").expect(401);
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
              .get("/projects/1")
              .set("Authorization", token)
              .expect(200);
          });
      });
  });
  it("returns the project with the right id w/ token", async () => {
    await request(server)
      .post("/auth/register")
      .send({ username: "test", password: "projects" })
      .then(async () => {
        await request(server)
          .post("/auth/login")
          .send({ username: "test", password: "projects" })
          .then(async (res) => {
            const token = res.body.token;
            await db("projects").insert(project);
            await request(server)
              .get("/projects/1")
              .set("Authorization", token)
              .then((res) => {
                expect(res.body).toEqual({ ...project, id: 1 });
              });
          });
      });
  });
});

describe("GET /projects/category/:category", () => {
  it("returns 401 without token", async () => {
    await request(server).get("/projects/category/game").expect(401);
  });
  it("returns 200 with valid token", async () => {
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
              .then((response) => {
                expect(200);
              });
          });
      });
  });
});

describe("POST /projects", () => {
  it("returns 401 Unauthorized w/out token", async () => {
    await request(server).post("/projects").send(project).expect(401);
  });
  it("returns 200 OK w/ token", async () => {
    await request(server)
      .post("/auth/register")
      .send({ username: "test", password: "projects" })
      .then(async () => {
        await request(server)
          .post("/auth/login")
          .send({ username: "test", password: "projects" })
          .then((res) => {
            const token = res.body.token;
            return request(server)
              .post("/projects")
              .set("Authorization", token)
              .send(project)
              .expect(201);
          });
      });
  });
});

describe("DELETE /projects/:id", () => {
  it("returns 401 Unauthorized w/out token", async () => {
    await request(server).delete("/projects").send(project).expect(401);
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
            await db("projects").insert(project2);
            await request(server)
              .delete(`/projects/${id}`)
              .set("Authorization", token)
              .expect(200);
          });
      });
  });
  it("deletes a project from the database", async () => {
    await request(server)
      .post("/auth/register")
      .send({ username: "test", password: "projects" })
      .then(async () => {
        await request(server)
          .post("/auth/login")
          .send({ username: "test", password: "projects" })
          .then(async (res) => {
            const token = res.body.token;
            expect(await db("projects")).toHaveLength(0);
            await db("projects").insert(project2);
            expect(await db("projects")).toHaveLength(1);
            await request(server)
              .delete(`/projects/${id}`)
              .set("Authorization", token);
            expect(await db("projects")).toHaveLength(0);
          });
      });
  });
});

describe("PUT /projects/:id", () => {
  it("returns 401 Unauthorized w/out token", async () => {
    await request(server).put("/projects/1").send(project).expect(401);
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
            await db("projects").insert(project);
            await request(server)
              .put("/projects/1")
              .set("Authorization", token)
              .send(project2)
              .expect(200);
          });
      });
  });
  it("updates the project correctly", async () => {
    await request(server)
      .post("/auth/register")
      .send({ username: "test", password: "projects" })
      .then(async () => {
        await request(server)
          .post("/auth/login")
          .send({ username: "test", password: "projects" })
          .then(async (res) => {
            const token = res.body.token;
            await db("projects").insert(project);
            await request(server)
              .put(`/projects/${id}`)
              .set("Authorization", token)
              .send(project2)
              .then(async () => {
                expect(await db("projects").where({ id }).first()).toEqual({
                  ...project2,
                  id: 1,
                });
              });
          });
      });
  });
});
