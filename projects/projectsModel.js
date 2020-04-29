const db = require("../data/dbConfig");

module.exports = {
  getAll,
  getById,
  add,
  del,
  update,
  getBy
};

function getAll() {
  return db("projects");
}

function getById(id) {
  return db("projects").where({id});
}

function add(project) {
  return db("projects").insert(project);
}

function del(id) {
  return db("projects").del().where({ id });
}

function update(id, update) {
  return db("projects").update(update).where({id});
}

function getBy(filter) {
  return db('projects').where(filter)
}


// describe("GET /projects", () => {
//   it("returns 401 Unauthorized w/out token", async () => {
//     await request(server).get("/projects").expect(401);
//   });
//   it("returns 200 OK w/ token", async () => {
//     await request(server)
//       .post("/auth/register")
//       .send({ username: "test", password: "projects" })
//       .then(async () => {
//         await request(server)
//           .post("/auth/login")
//           .send({ username: "test", password: "projects" })
//           .then(async (res) => {
//             const token = res.body.token;
//             await request(server)
//               .get("/projects")
//               .set("Authorization", token)
//               .expect(200);
//           });
//       });
//   });
// });