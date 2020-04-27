const db = require("../data/dbConfig");

module.exports = {
  getAll,
  add,
  delete
};

function getAll() {
  return db("projects");
}

function add(project) {
  return db("projects").insert(project);
}

function add(project) {
  return db("projects").insert(project);
}

