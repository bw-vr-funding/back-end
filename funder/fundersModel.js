const db = require("../data/dbConfig");

module.exports = {
  getProjectsByFunder,
  add,
};

function getProjectsByFunder(funder_id) {
  return db("projects")
    .join("users-projects", "users-projects.project_id", "=", "projects.id")
    .where({ funder_id });
}

function add(funder) {
  return db("users-projects").insert(funder);
}
