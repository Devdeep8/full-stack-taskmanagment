export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("wallets", {
      fields: ["userId"],
      type: "foreign key",
      name: "wallets_userId_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "wallets",
      "wallets_userId_fkey"
    );
  },
};
