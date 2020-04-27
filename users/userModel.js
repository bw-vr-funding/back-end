const db = require("../data/dbConfig");

module.exports = {
  findBy,
  add,
};

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users").insert(user);
}
