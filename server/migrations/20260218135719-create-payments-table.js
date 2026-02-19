"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      stripeSessionId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // 🔥 prevents double credit
      },

      packId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      currency: {
        type: Sequelize.STRING,
        defaultValue: "usd",
      },

      status: {
        type: Sequelize.ENUM("pending", "completed", "failed"),
        defaultValue: "pending",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");

    // 🔥 Important for Postgres
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_payments_status";'
    );
  },
};
