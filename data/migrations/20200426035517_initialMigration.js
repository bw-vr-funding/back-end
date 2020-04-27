exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 24).notNullable().unique();
      tbl.string("password").notNullable();
    })
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.string("name", 40).notNullable().unique();
      tbl.string("description").notNullable();
      tbl.string("img_url")
      tbl.string("category", 16).notNullable();
      tbl.integer("funding_goal").notNullable();
      tbl.integer("funding").notNullable();
      tbl
        .integer("creator_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    })
    .createTable("users-projects", (tbl) => {
      tbl.increments();
      tbl
        .integer("funder_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users-projects")
    .dropTableIfExists("projects")
    .dropTableIfExists("users");
};
