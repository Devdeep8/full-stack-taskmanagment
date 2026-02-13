/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("users", "deletedAt", {
    type: Sequelize.DATE,
    allowNull: true,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("users", "deletedAt");
}
