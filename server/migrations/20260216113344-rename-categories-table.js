export async function up(queryInterface) {
  // Rename "Categories" → categories
  await queryInterface.renameTable("Categories", "categories");
}

export async function down(queryInterface) {
  // Revert back if needed
  await queryInterface.renameTable("categories", "Categories");
}
