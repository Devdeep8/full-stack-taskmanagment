export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("users", "password", {
    type: Sequelize.STRING,
    allowNull: false,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("users", "password");
}
