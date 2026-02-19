"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wallet_transactions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      walletId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "wallets",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

      type: {
        type: Sequelize.ENUM("credit", "debit"),
        allowNull: false,
      },

      goldCoins: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },

      sweepCoins: {
        type: Sequelize.DECIMAL(10, 4),
        defaultValue: 0,
      },

      redeemableSweepCoins: {
        type: Sequelize.DECIMAL(10, 4),
        defaultValue: 0,
      },

      source: {
        type: Sequelize.STRING, // stripe | admin | refund
        allowNull: true,
      },

      referenceId: {
        type: Sequelize.STRING, // stripeSessionId
        allowNull: true,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("wallet_transactions");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_wallet_transactions_type";'
    );
  },
};
