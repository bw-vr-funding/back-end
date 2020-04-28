const db = require("../data/dbConfig");

module.exports = {
  getAll,
  getById,
  add,
  del,
  update,
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