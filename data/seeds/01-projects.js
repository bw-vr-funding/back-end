
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([
        {
          id: 1,
          name: "loup-garou pour une nuit",
          description: "One of the most loved french party game ever created",
          img_url:
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcvaksBQhrVCyZL4yvLy6WhAcg1GN9mC9tNdganvq8zKAWMIpk-QQ&usqp=CAc",
          category: "game",
          funding_goal: 200000,
          funding: 163290,
          creator_id: 1,
        },
      ]);
    });
};
