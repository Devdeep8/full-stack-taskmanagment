"use strict";

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.addIndex("games", ["createdAt"], {
    name: "idx_games_created_at_desc",
    order: [["createdAt", "DESC"]],
  });
}
4


export async function down(queryInterface, Sequelize) {
  await queryInterface.removeIndex("games", "idx_games_created_at_desc");
}