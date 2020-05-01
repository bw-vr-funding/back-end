
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users-projects').del()
    .then(function () {
      // Inserts seed entries
      return knex("users-projects").insert([
        { id: 1, funder_id: 2, project_id: 1 },
        { id: 2, funder_id: 2, project_id: 2 },
        { id: 3, funder_id: 1, project_id: 1 },
      ]);
    });
};
