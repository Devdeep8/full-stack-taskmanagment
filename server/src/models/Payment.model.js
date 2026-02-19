import { DataTypes } from "@sequelize/core";
import { sequelize } from "../config/db.js";

export const Payment = sequelize.define(
  "Payment",
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

    stripeSessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // prevents double credit
    },

    packId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      defaultValue: "usd",
    },

    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "payments",
    paranoid: true,
  }
);
