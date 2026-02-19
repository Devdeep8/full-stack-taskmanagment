// src/models/index.js
import { sequelize } from "../config/db.js";

import { User } from "./User.model.js";
import { Wallet } from "./Wallet.model.js";
import { Category } from "./Category.model.js";
import { Game } from "./Game.model.js";
import { WalletTransaction } from "./WalletTransaction.model.js";
import { Payment } from "./Payment.model.js";

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

  Wallet.belongsTo(User, {
    foreignKey: "userId",
    as: "owner",
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

  Game.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
  });


  /*
  ===============================
  USER ↔ PAYMENT (1:M)
  ===============================
  */

  User.hasMany(Payment, {
    foreignKey: "userId",
    as: "payments",
    inverse: {
      as: "user",
    },
  });

  Payment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });


  /*
  ===============================
  WALLET ↔ WALLET TRANSACTIONS (1:M)
  ===============================
  */

  Wallet.hasMany(WalletTransaction, {
    foreignKey: "walletId",
    as: "transactions",
    inverse: {
      as: "wallet",
    },
  });

  WalletTransaction.belongsTo(Wallet, {
    foreignKey: "walletId",
    as: "wallet",
  });


  /*
  ===============================
  USER ↔ WALLET TRANSACTIONS (1:M)
  ===============================
  */

  User.hasMany(WalletTransaction, {
    foreignKey: "userId",
    as: "walletTransactions",
    inverse: {
      as: "user",
    },
  });

  WalletTransaction.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};


export const db = {
  users: User,
  wallets: Wallet,
  categories: Category,
  games: Game,
  payments: Payment,
  walletTransactions: WalletTransaction,
  sequelize,
};
