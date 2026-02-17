import { DataTypes } from "@sequelize/core";
import { sequelize } from "../config/db.js";

export const Game = sequelize.define(
  "Game",
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

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bannerUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    rtp: {
      type: DataTypes.FLOAT, 
      allowNull: true,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

    tags: {
      type: DataTypes.JSON, 
      allowNull: true,
    },

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,

      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    paranoid: true, 
    tableName: "games",
    timestamps: true,
  },
);
