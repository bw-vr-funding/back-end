const db = require("../data/dbConfig");

module.exports = {
  findBy,
  add,
  del,
  update,
};

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users").insert(user);
}

function del(id) {
  return db("users").del().where({ id });
}

function update(id, changes) {
  return db("users").update(changes).where({ id });
}
