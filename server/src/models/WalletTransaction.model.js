import { DataTypes } from "@sequelize/core";
import { sequelize } from "../config/db.js";

export const WalletTransaction = sequelize.define(
  "WalletTransaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    walletId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("credit", "debit"),
      allowNull: false,
    },

    goldCoins: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },

    sweepCoins: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 0,
    },

    redeemableSweepCoins: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 0,
    },

    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "wallet_transactions",
    paranoid: true,
  }
);
