export async function up(queryInterface) {
  await queryInterface.removeIndex("games", "idx_games_created_at_desc");

  await queryInterface.addIndex("games", ["createdAt", "id"], {
    name: "idx_games_created_at_id_desc",
    order: [
      ["createdAt", "DESC"],
      ["id", "DESC"],
    ],
  });
}

export async function down(queryInterface) {
  await queryInterface.removeIndex("games", "idx_games_created_at_id_desc");

  await queryInterface.addIndex("games", ["createdAt"], {
    name: "idx_games_created_at_desc",
    order: [["createdAt", "DESC"]],
  });
}