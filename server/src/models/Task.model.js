// src/models/Task.model.js
import { DataTypes } from "@sequelize/core";
import { sequelize } from "../config/db.js";
DataTypes
export const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("todo", "in-progress", "done"),
      defaultValue: "todo",
    },

    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    assigneeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    tableName: "tasks",
    timestamps: true,
  }
);
