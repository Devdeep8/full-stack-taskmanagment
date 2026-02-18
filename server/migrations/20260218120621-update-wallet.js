// migrations/20260218120621-update-wallet.js

"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("wallets", "goldCoinBalance", {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      allowNull: false,
    });

    await queryInterface.addColumn("wallets", "sweepCoinBalance", {
      type: Sequelize.DECIMAL(10, 4),
      defaultValue: 0.0,
      allowNull: false,
    });

    await queryInterface.addColumn("wallets", "redeemableSweepCoinBalance", {
      type: Sequelize.DECIMAL(10, 4),
      defaultValue: 0.0,
      allowNull: false,
    });

    await queryInterface.addColumn("wallets", "isLocked", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });

    await queryInterface.removeColumn("wallets", "balance");
    await queryInterface.removeColumn("wallets", "currency");

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("wallets", "wallets_userId_unique");
    await queryInterface.removeColumn("wallets", "isLocked");
    await queryInterface.removeColumn("wallets", "redeemableSweepCoinBalance");
    await queryInterface.removeColumn("wallets", "sweepCoinBalance");
    await queryInterface.removeColumn("wallets", "goldCoinBalance");

    await queryInterface.addColumn("wallets", "balance", {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });

    await queryInterface.addColumn("wallets", "currency", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "USD",
    });
  },
};