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

    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USD",
    },
  },
  {
    paranoid: true,
    tableName: "wallets",
  }
);
