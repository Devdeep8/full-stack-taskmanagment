// src/models/User.model.js
import { DataTypes } from "@sequelize/core";
import { sequelize } from "../config/db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    address: DataTypes.TEXT,
    zipCode: DataTypes.STRING,
    state: DataTypes.STRING,
  },
  {
    paranoid: true,
    tableName: "users",
  },
);
