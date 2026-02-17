export async function up(queryInterface) {
  await queryInterface.renameTable("Categories", "categories");
}

export async function down(queryInterface) {
  await queryInterface.renameTable("categories", "Categories");
}
