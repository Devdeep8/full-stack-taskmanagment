import { DataTypes } from "@sequelize/core";
import { sequelize } from "../config/db.js";

export const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    goldCoinBalance: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
    },

    sweepCoinBalance: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 0.0,
      allowNull: false,
    },

    redeemableSweepCoinBalance: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 0.0,
      allowNull: false,
    },

    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
    tableName: "wallets",
    indexes: [
      { unique: true, fields: ["userId"] },
    ],
  }
);