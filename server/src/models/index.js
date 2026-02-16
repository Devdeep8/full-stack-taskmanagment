// src/models/index.js
import { sequelize } from "../config/db.js";

import { User } from "./User.model.js";
import { Wallet } from "./Wallet.model.js";
import { Category } from "./Category.model.js";
import { Game } from "./Game.model.js";
export const associateModels = () => {

  /*
  ===============================
  USER ↔ WALLET (1:1)
  ===============================
  */

  User.hasOne(Wallet, {
    foreignKey: "userId",
    as: "wallet",
    inverse: {
      as: "owner",
    },
  });

  /*
  ===============================
  CATEGORY ↔ GAME (1:M)
  ===============================
  */

  Category.hasMany(Game, {
    foreignKey: "categoryId",
    as: "games",
    inverse: {
      as: "category",
    },
  });

};

export const db = {
  users: User,
  wallets: Wallet,
  categories: Category,
  games: Game,
  sequelize,
};
