const db = require("../data/dbConfig");

module.exports = {
  getAll,
  add,
  del,
};

function getAll() {
  return db("projects");
}

function add(project) {
  return db("projects").insert(project);
}

function del(id) {
  return db("projects").del().where({ id });
}
