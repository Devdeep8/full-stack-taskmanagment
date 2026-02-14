export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wallets", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },

      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USD",
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("wallets");
  },
};
