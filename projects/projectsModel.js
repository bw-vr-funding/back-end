const db = require("../data/dbConfig");

module.exports = {
  add,
};



function add(project) {
  return db("projects").insert(project);
}