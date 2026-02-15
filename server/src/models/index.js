// src/models/index.js
import { sequelize } from "../config/db.js";
import { User } from "./User.model.js";
import { Wallet } from "./Wallet.model.js";
export const associateModels = () => {
  // Define associations with inverse option for v7

  User.hasOne(Wallet, {
    foreignKey: "userId",
    as: "wallet",
    inverse: {
      as: "owner",
    },
  });

  // Task belongs to User (creator)
};
export const db = {
  users: User,
  wallet:Wallet,
  sequelize: sequelize,
};
